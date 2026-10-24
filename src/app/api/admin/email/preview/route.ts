import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/permissions";
import {
  FALLBACK_NAME,
  MANUAL_TEMPLATES,
  fillName,
  renderManualEmail,
  stripHeaderChars,
  type ManualTemplateId,
} from "@/lib/manualEmail";

export async function POST(req: Request) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  const body = await req.json().catch(() => null);
  const template = MANUAL_TEMPLATES.find((t) => t.id === body?.templateId);
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }

  const name = String(body.name || "").trim() || FALLBACK_NAME;
  const html = await renderManualEmail({
    templateId: template.id as ManualTemplateId,
    recipientName: name,
    heading: String(body.heading || ""),
    body: String(body.body || ""),
  });

  return NextResponse.json({
    html,
    subject: fillName(stripHeaderChars(String(body.subject || "")), name),
  });
}
