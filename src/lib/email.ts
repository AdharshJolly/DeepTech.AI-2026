import connectToDatabase from "@/lib/db";
import EmailLog from "@/models/EmailLog";
import SiteSettings from "@/models/SiteSettings";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;
const DAILY_LIMIT = 100;

async function getEmailSettings(): Promise<{ cc: string; bcc: string }> {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.find({
      key: { $in: ["admin_cc_email", "admin_bcc_email"] },
    });
    const result = { cc: "", bcc: "" };
    settings.forEach((s) => {
      if (s.key === "admin_cc_email") result.cc = s.value;
      if (s.key === "admin_bcc_email") result.bcc = s.value;
    });
    return result;
  } catch {
    return { cc: "", bcc: "" };
  }
}

function cleanEmailList(emails: string): string {
  if (!emails) return "";
  return emails
    .split(",")
    .map((e) => e.trim())
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
    .join(",");
}

export async function sendEmail(data: {
  to: string;
  subject: string;
  html: string;
  type?: string;
  cc?: string;
  bcc?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    console.warn("GOOGLE_APPS_SCRIPT_URL not configured, skipping email");
    return { success: false, error: "Email service not configured" };
  }

  // Auto-CC/BCC admin on confirmation emails
  let cc = data.cc;
  let bcc = data.bcc;
  if (data.type?.includes("confirmation")) {
    const settings = await getEmailSettings();
    if (!cc) cc = settings.cc;
    if (!bcc) bcc = settings.bcc;
  }

  // Clean and validate email lists
  cc = cleanEmailList(cc || "");
  bcc = cleanEmailList(bcc || "");

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
        bcc: bcc || undefined,
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

const EMAIL_FOOTER = `
  <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;">
    <p style="color:#9ca3af;font-size:12px;margin:0;">IEEE Computer Society Bangalore Chapter</p>
    <p style="color:#9ca3af;font-size:12px;margin:4px 0 0;">John F. Welch Technology Center (LFWTC), Bengaluru, India</p>
    <p style="color:#9ca3af;font-size:12px;margin:4px 0 0;">
      <a href="https://deeptech.ai" style="color:#00629B;text-decoration:none;">deeptech.ai</a> &nbsp;|&nbsp;
      <a href="https://linkedin.com/company/ieeecsbc" style="color:#00629B;text-decoration:none;">LinkedIn</a> &nbsp;|&nbsp;
      <a href="https://twitter.com/ieeecsbc" style="color:#00629B;text-decoration:none;">X (Twitter)</a>
    </p>
  </div>
`;

const EVENT_DETAILS_CARD = `
  <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:24px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-weight:600;width:30%;">Event</td>
        <td style="padding:8px 0;color:#1f2937;">DeepTech.AI 2026 — Physical AI Summit</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-weight:600;">Date</td>
        <td style="padding:8px 0;color:#1f2937;">Friday, October 30, 2026</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-weight:600;">Time</td>
        <td style="padding:8px 0;color:#1f2937;">09:00 AM – 06:00 PM IST</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#6b7280;font-weight:600;">Venue</td>
        <td style="padding:8px 0;color:#1f2937;">GE Healthcare<br/>John F. Welch Technology Center (LFWTC)<br/>Bengaluru, India</td>
      </tr>
    </table>
  </div>
`;

export async function sendRegistrationConfirmation(registration: {
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
}) {
  return sendEmail({
    to: registration.email,
    type: "registration_confirmation",
    subject: "Your Registration for DeepTech.AI 2026 Has Been Received",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#00629B 0%,#00B5E2 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">DeepTech.AI 2026</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">Physical AI Summit</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${registration.fullName}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thank you for registering for <strong>DeepTech.AI 2026</strong>, the flagship event by IEEE Computer Society Bangalore Chapter focused on Physical AI and robotics.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            We have received your registration and our team is reviewing your submission. You will receive a confirmation email once your registration has been approved.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            <strong>Registration Details:</strong>
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:20px;">
            <tr>
              <td style="padding:6px 0;color:#6b7280;width:35%;">Name</td>
              <td style="padding:6px 0;color:#1f2937;">${registration.fullName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Organization</td>
              <td style="padding:6px 0;color:#1f2937;">${registration.organization}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Role</td>
              <td style="padding:6px 0;color:#1f2937;">${registration.jobTitle}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#6b7280;">Status</td>
              <td style="padding:6px 0;"><span style="background:#FEF3C7;color:#92400E;font-size:12px;font-weight:600;padding:3px 10px;border-radius:12px;">Pending Review</span></td>
            </tr>
          </table>

          ${EVENT_DETAILS_CARD}

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            If you have any questions, please don't hesitate to reach out to us.
          </p>

          ${EMAIL_FOOTER}
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
    subject: "Registration Confirmed — DeepTech.AI 2026",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#059669 0%,#10b981 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">Registration Confirmed</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">Welcome to DeepTech.AI 2026</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${registration.fullName}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            We are pleased to inform you that your registration for <strong>DeepTech.AI 2026</strong> has been <strong style="color:#059669;">approved</strong>.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            You are now confirmed to attend the flagship IEEE CS Bangalore event on Physical AI, robotics, and industrial automation. Join us for an exciting day of keynotes, technical sessions, and networking with industry leaders.
          </p>

          ${EVENT_DETAILS_CARD}

          <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#065F46;font-size:14px;margin:0;font-weight:600;">Please bring a valid photo ID for event check-in.</p>
          </div>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            We look forward to welcoming you at GE Healthcare, Bengaluru.
          </p>

          ${EMAIL_FOOTER}
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
    subject: "Update on Your DeepTech.AI 2026 Registration",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#4B5563 0%,#6B7280 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">Registration Update</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">DeepTech.AI 2026</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${registration.fullName}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thank you for your interest in <strong>DeepTech.AI 2026</strong>. We appreciate you taking the time to register for our event.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            After careful review, we regret to inform you that we are unable to accommodate your registration at this time due to limited capacity.
          </p>

          <div style="background:#F3F4F6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#374151;font-size:14px;margin:0;">
              <strong>Alternative options:</strong><br/>
              You may follow us on <a href="https://linkedin.com/company/ieeecsbc" style="color:#00629B;">LinkedIn</a> or <a href="https://twitter.com/ieeecsbc" style="color:#00629B;">X (Twitter)</a> for updates on future events and opportunities.
            </p>
          </div>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            If you believe this is an error, please contact us at <a href="mailto:ieeecsbc@gmail.com" style="color:#00629B;">ieeecsbc@gmail.com</a>.
          </p>

          ${EMAIL_FOOTER}
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
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#FFA300 0%,#F59E0B 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">Partnership Inquiry Received</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">DeepTech.AI 2026</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${partner.contactPerson}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thank you for your interest in partnering with <strong>${partner.organizationName}</strong> for <strong>DeepTech.AI 2026</strong>.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            We have received your partnership inquiry and our partnerships team will review it thoroughly. You can expect to hear from us within <strong>3–5 business days</strong> to discuss potential collaboration opportunities.
          </p>

          <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#92400E;font-size:14px;margin:0;">
              <strong>What happens next?</strong><br/>
              Our team will assess your inquiry and reach out via email or phone to explore how we can collaborate for this flagship event.
            </p>
          </div>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            In the meantime, feel free to learn more about the event at <a href="https://deeptech.ai" style="color:#00629B;">deeptech.ai</a>.
          </p>

          ${EMAIL_FOOTER}
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
    subject: "Partnership Confirmed — DeepTech.AI 2026",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#059669 0%,#10b981 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">Partnership Confirmed</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">DeepTech.AI 2026</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${partner.contactPerson}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            We are delighted to inform you that the partnership inquiry from <strong>${partner.organizationName}</strong> has been <strong style="color:#059669;">approved</strong>.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Our partnerships team will be in touch with you shortly to finalize the collaboration details, including booth arrangements, branding opportunities, and event logistics.
          </p>

          <div style="background:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#065F46;font-size:14px;margin:0;font-weight:600;">Next Steps:</p>
            <ul style="color:#065F46;font-size:14px;margin:8px 0 0;padding-left:20px;">
              <li>Partnership agreement review</li>
              <li>Booth/sponsorship logistics</li>
              <li>Branding and promotional material guidelines</li>
            </ul>
          </div>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            We are excited to have <strong>${partner.organizationName}</strong> as a partner for this landmark event.
          </p>

          ${EMAIL_FOOTER}
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
    subject: "Partnership Inquiry Update — DeepTech.AI 2026",
    html: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;padding:0;">
        <div style="background:linear-gradient(135deg,#4B5563 0%,#6B7280 100%);padding:32px 30px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:12px;margin:0;letter-spacing:2px;text-transform:uppercase;">IEEE Computer Society Bangalore Chapter</p>
          <h1 style="color:#fff;margin:12px 0 0;font-size:26px;font-weight:700;">Partnership Inquiry Update</h1>
          <p style="color:rgba(255,255,255,0.9);font-size:14px;margin:6px 0 0;">DeepTech.AI 2026</p>
        </div>

        <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#374151;font-size:16px;margin:0 0 16px;">Dear <strong>${partner.contactPerson}</strong>,</p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thank you for your interest in partnering with <strong>${partner.organizationName}</strong> for <strong>DeepTech.AI 2026</strong>.
          </p>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
            After careful consideration, we regret to inform you that we are unable to proceed with this partnership at this time. Our partnership slots for this event have been finalized.
          </p>

          <div style="background:#F3F4F6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#374151;font-size:14px;margin:0;">
              <strong>Stay Connected:</strong><br/>
              We encourage you to follow us on <a href="https://linkedin.com/company/ieeecsbc" style="color:#00629B;">LinkedIn</a> for updates on future events and partnership opportunities.
            </p>
          </div>

          <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 8px;">
            If you have any questions, please contact us at <a href="mailto:ieeecsbc@gmail.com" style="color:#00629B;">ieeecsbc@gmail.com</a>.
          </p>

          ${EMAIL_FOOTER}
        </div>
      </div>
    `,
  });
}
