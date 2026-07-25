import connectToDatabase from "@/lib/db";
import EmailLog from "@/models/EmailLog";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;
const ADMIN_CC_EMAIL = process.env.ADMIN_CC_EMAIL || "";
const DAILY_LIMIT = 100;

export async function sendEmail(data: {
  to: string;
  subject: string;
  html: string;
  type?: string;
  cc?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    console.warn("GOOGLE_APPS_SCRIPT_URL not configured, skipping email");
    return { success: false, error: "Email service not configured" };
  }

  // Auto-CC admin on confirmation emails
  const cc = data.cc || (data.type?.includes("confirmation") ? ADMIN_CC_EMAIL : "");

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: EMAIL_SECRET,
        to: data.to,
        subject: data.subject,
        html: data.html,
        cc: cc || undefined,
      }),
    });

    const result = await res.json();

    // Log successful send
    if (result.success) {
      try {
        await connectToDatabase();
        await EmailLog.create({
          to: data.to,
          subject: data.subject,
          type: data.type || "unknown",
        });
      } catch {
        // silently fail — don't block email flow
      }
    }

    return result;
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function getEmailStats() {
  try {
    await connectToDatabase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sentToday = await EmailLog.countDocuments({
      sentAt: { $gte: today },
    });

    return {
      sentToday,
      remaining: Math.max(0, DAILY_LIMIT - sentToday),
      limit: DAILY_LIMIT,
    };
  } catch {
    return { sentToday: 0, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
  }
}

// ── Email Templates ──────────────────────────────────────────

export async function sendRegistrationConfirmation(registration: {
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
}) {
  return sendEmail({
    to: registration.email,
    type: "registration_confirmation",
    subject: "Registration Received — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#00629B,#00B5E2);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">DeepTech.AI 2026</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${registration.fullName}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Thank you for registering for DeepTech.AI 2026!</p>
          <p style="color:#374151;font-size:16px;">We've received your registration and our team will review it shortly. You'll receive another email once your registration is confirmed.</p>
          <div style="background:#fff;border-radius:8px;padding:20px;margin:20px 0;border:1px solid #e5e7eb;">
            <p style="margin:5px 0;color:#6b7280;"><strong>Event Details:</strong></p>
            <p style="margin:5px 0;color:#374151;">📅 October 30, 2026</p>
            <p style="margin:5px 0;color:#374151;">🕐 09:00 AM – 06:00 PM</p>
            <p style="margin:5px 0;color:#374151;">📍 GE Healthcare, LFWTC, Bengaluru</p>
          </div>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}

export async function sendRegistrationApproved(registration: {
  fullName: string;
  email: string;
}) {
  return sendEmail({
    to: registration.email,
    subject: "Registration Approved — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#059669,#10b981);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Registration Approved!</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${registration.fullName}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Great news! Your registration for DeepTech.AI 2026 has been <strong style="color:#059669;">approved</strong>.</p>
          <p style="color:#374151;font-size:16px;">We look forward to seeing you on October 30, 2026 at GE Healthcare, Bengaluru.</p>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}

export async function sendRegistrationRejected(registration: {
  fullName: string;
  email: string;
}) {
  return sendEmail({
    to: registration.email,
    subject: "Registration Update — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#6b7280,#9ca3af);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Registration Update</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${registration.fullName}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Thank you for your interest in DeepTech.AI 2026.</p>
          <p style="color:#374151;font-size:16px;">Unfortunately, we are unable to accommodate your registration at this time. If you believe this is an error, please contact us.</p>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}

// ── Partner Inquiry Emails ─────────────────────────────────────

export async function sendPartnerInquiryConfirmation(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  return sendEmail({
    to: partner.workEmail,
    type: "partner_inquiry_confirmation",
    subject: "Partnership Inquiry Received — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#FFA300,#f59e0b);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Partnership Inquiry Received</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${partner.contactPerson}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Thank you for your interest in partnering with <strong>${partner.organizationName}</strong> for DeepTech.AI 2026!</p>
          <p style="color:#374151;font-size:16px;">We've received your partnership inquiry and our team will review it shortly. We'll get back to you within <strong>3-5 business days</strong> to discuss collaboration opportunities.</p>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}

export async function sendPartnerInquiryApproved(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  return sendEmail({
    to: partner.workEmail,
    subject: "Partnership Approved — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#059669,#10b981);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Partnership Approved!</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${partner.contactPerson}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Great news! Your partnership inquiry for <strong>${partner.organizationName}</strong> has been <strong style="color:#059669;">approved</strong>.</p>
          <p style="color:#374151;font-size:16px;">Our partnerships team will reach out to you shortly to discuss the next steps and collaboration details.</p>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}

export async function sendPartnerInquiryRejected(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  return sendEmail({
    to: partner.workEmail,
    subject: "Partnership Update — DeepTech.AI 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
        <div style="background:linear-gradient(135deg,#6b7280,#9ca3af);padding:30px;border-radius:12px 12px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Partnership Update</h1>
        </div>
        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;">Hi <strong>${partner.contactPerson}</strong>,</p>
          <p style="color:#374151;font-size:16px;">Thank you for your interest in partnering with <strong>${partner.organizationName}</strong> for DeepTech.AI 2026.</p>
          <p style="color:#374151;font-size:16px;">Unfortunately, we are unable to proceed with this partnership at this time. If you have any questions, please contact us.</p>
          <p style="color:#6b7280;font-size:14px;">Best regards,<br>IEEE Computer Society Bangalore Chapter</p>
        </div>
      </div>
    `,
  });
}
