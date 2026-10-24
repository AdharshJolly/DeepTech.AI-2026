import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import EmailLog from "@/models/EmailLog";
import { sendEmail } from "@/lib/email";
import {
  FALLBACK_NAME,
  MANUAL_TEMPLATES,
  MAX_RECIPIENTS,
  fillName,
  isValidEmail,
  parseAddressList,
  renderManualEmail,
  stripHeaderChars,
  type ManualRecipient,
  type ManualTemplateId,
} from "@/lib/manualEmail";

// "to" mode sends one email per recipient, so the client sends them in small
// batches to stay inside the serverless time limit.
const MAX_PER_TO_REQUEST = 5;

interface SendResult {
  email: string;
  success: boolean;
  error?: string;
}

async function logSent(emails: string[], subject: string, type: string) {
  try {
    await connectToDatabase();
    await EmailLog.insertMany(
      emails.map((to) => ({ to, subject, type, sentAt: new Date() }))
    );
  } catch {
    // never block the send flow on logging
  }
}

export async function POST(req: Request) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const mode = body.mode === "bcc" ? "bcc" : body.mode === "to" ? "to" : null;
  if (!mode) {
    return NextResponse.json({ error: "Mode must be 'to' or 'bcc'" }, { status: 400 });
  }

  const template = MANUAL_TEMPLATES.find((t) => t.id === body.templateId);
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }
  const templateId = template.id as ManualTemplateId;

  const subjectRaw = stripHeaderChars(String(body.subject || ""));
  if (!subjectRaw) {
    return NextResponse.json({ error: "Subject is required" }, { status: 400 });
  }
  const heading = String(body.heading || "").trim();
  const message = String(body.body || "").trim();
  if (templateId === "custom" && (!heading || !message)) {
    return NextResponse.json(
      { error: "Custom message needs a heading and a message" },
      { status: 400 }
    );
  }

  // Recipients: re-validate and de-duplicate server-side.
  const rawRecipients: unknown[] = Array.isArray(body.recipients) ? body.recipients : [];
  const recipients: ManualRecipient[] = [];
  const seen = new Set<string>();
  for (const r of rawRecipients) {
    const item = r as { email?: unknown; name?: unknown };
    const email = String(item?.email || "").trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: `Invalid recipient: ${email || "(empty)"}` }, { status: 400 });
    }
    if (seen.has(email)) continue;
    seen.add(email);
    recipients.push({ email, name: String(item?.name || "").trim() || undefined });
  }
  if (recipients.length === 0) {
    return NextResponse.json({ error: "Add at least one recipient" }, { status: 400 });
  }
  const limit = mode === "bcc" ? MAX_RECIPIENTS : MAX_PER_TO_REQUEST;
  if (recipients.length > limit) {
    return NextResponse.json(
      { error: `Too many recipients in one request (max ${limit})` },
      { status: 400 }
    );
  }

  const cc = parseAddressList(String(body.cc || ""));
  if (cc.invalid.length > 0) {
    return NextResponse.json(
      { error: `Invalid CC address: ${cc.invalid.join(", ")}` },
      { status: 400 }
    );
  }
  const ccList = cc.emails.join(",");
  const logType = `manual_${templateId}`;

  if (mode === "to") {
    const results: SendResult[] = await Promise.all(
      recipients.map(async (r): Promise<SendResult> => {
        const name = r.name || FALLBACK_NAME;
        const subject = fillName(subjectRaw, name);
        try {
          const html = await renderManualEmail({
            templateId,
            recipientName: name,
            heading,
            body: message,
          });
          const res = await sendEmail({
            to: r.email,
            cc: ccList || undefined,
            subject,
            html,
            skipDefaultCopies: true,
            skipLog: true,
          });
          if (res.success) await logSent([r.email], subject, logType);
          return { email: r.email, success: !!res.success, error: res.success ? undefined : res.error };
        } catch {
          return { email: r.email, success: false, error: "Failed to send" };
        }
      })
    );
    return NextResponse.json({ results });
  }

  // BCC: one email with no visible "To", so only the recipients count toward quota.
  const subject = fillName(subjectRaw, FALLBACK_NAME);
  try {
    const html = await renderManualEmail({
      templateId,
      recipientName: FALLBACK_NAME,
      heading,
      body: message,
    });
    const res = await sendEmail({
      cc: ccList || undefined,
      bcc: recipients.map((r) => r.email).join(","),
      subject,
      html,
      skipDefaultCopies: true,
      skipLog: true,
    });
    if (res.success) await logSent(recipients.map((r) => r.email), subject, logType);
    const results: SendResult[] = recipients.map((r) => ({
      email: r.email,
      success: !!res.success,
      error: res.success ? undefined : res.error,
    }));
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
