import connectToDatabase from "@/lib/db";
import EmailLog from "@/models/EmailLog";
import SiteSettings from "@/models/SiteSettings";
import { render } from "@react-email/render";
import React from "react";

import RegistrationConfirmationEmail from "@/emails/RegistrationConfirmationEmail";
import RegistrationApprovedEmail from "@/emails/RegistrationApprovedEmail";
import RegistrationRejectedEmail from "@/emails/RegistrationRejectedEmail";
import PartnerInquiryConfirmationEmail from "@/emails/PartnerInquiryConfirmationEmail";
import PartnerInquiryApprovedEmail from "@/emails/PartnerInquiryApprovedEmail";
import PartnerInquiryRejectedEmail from "@/emails/PartnerInquiryRejectedEmail";

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

async function getGlobalEventSettings() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.find();
    const result: Record<string, string> = {};
    settings.forEach((s) => (result[s.key] = s.value));
    return result;
  } catch {
    return {};
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

  // Auto-CC/BCC admin on emails
  let cc = data.cc;
  let bcc = data.bcc;
  
  const settings = await getEmailSettings();
  if (!cc) cc = settings.cc;
  if (!bcc) bcc = settings.bcc;

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

export async function sendRegistrationConfirmation(registration: {
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(RegistrationConfirmationEmail, {
      fullName: registration.fullName,
      organization: registration.organization,
      jobTitle: registration.jobTitle,
      eventDate: settings.event_date,
      eventTime: settings.event_time,
      eventVenue: settings.event_venue,
      urlLinkedin: settings.url_linkedin,
      urlTwitter: settings.url_twitter,
      urlInstagram: settings.url_instagram,
    })
  );

  return sendEmail({
    to: registration.email,
    type: "registration_confirmation",
    subject: "Your Registration for DeepTech.AI 2026 Has Been Received",
    html,
  });
}

export async function sendRegistrationApproved(registration: {
  fullName: string;
  email: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(RegistrationApprovedEmail, {
      fullName: registration.fullName,
      ctaUrl: settings.cta_registration_calendar,
      eventDate: settings.event_date,
      eventTime: settings.event_time,
      eventVenue: settings.event_venue,
      urlLinkedin: settings.url_linkedin,
      urlTwitter: settings.url_twitter,
      urlInstagram: settings.url_instagram,
    })
  );

  return sendEmail({
    to: registration.email,
    subject: "Registration Confirmed — DeepTech.AI 2026",
    html,
  });
}

export async function sendRegistrationRejected(registration: {
  fullName: string;
  email: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(RegistrationRejectedEmail, {
      fullName: registration.fullName,
      urlLinkedin: settings.url_linkedin,
      urlTwitter: settings.url_twitter,
      contactEmail: settings.contact_email,
    })
  );

  return sendEmail({
    to: registration.email,
    subject: "Update on Your DeepTech.AI 2026 Registration",
    html,
  });
}

// ── Partner Inquiry Emails ─────────────────────────────────────

export async function sendPartnerInquiryConfirmation(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(PartnerInquiryConfirmationEmail, {
      contactPerson: partner.contactPerson,
      organizationName: partner.organizationName,
      urlWebsite: settings.url_website,
    })
  );

  return sendEmail({
    to: partner.workEmail,
    type: "partner_inquiry_confirmation",
    subject: "Partnership Inquiry Received — DeepTech.AI 2026",
    html,
  });
}

export async function sendPartnerInquiryApproved(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(PartnerInquiryApprovedEmail, {
      contactPerson: partner.contactPerson,
      organizationName: partner.organizationName,
      ctaUrl: settings.cta_partner_login,
      urlLinkedin: settings.url_linkedin,
      urlTwitter: settings.url_twitter,
      urlInstagram: settings.url_instagram,
    })
  );

  return sendEmail({
    to: partner.workEmail,
    subject: "Partnership Confirmed — DeepTech.AI 2026",
    html,
  });
}

export async function sendPartnerInquiryRejected(partner: {
  contactPerson: string;
  workEmail: string;
  organizationName: string;
}) {
  const settings = await getGlobalEventSettings();
  const html = await render(
    React.createElement(PartnerInquiryRejectedEmail, {
      contactPerson: partner.contactPerson,
      organizationName: partner.organizationName,
      urlLinkedin: settings.url_linkedin,
      contactEmail: settings.contact_email,
    })
  );

  return sendEmail({
    to: partner.workEmail,
    subject: "Partnership Inquiry Update — DeepTech.AI 2026",
    html,
  });
}
