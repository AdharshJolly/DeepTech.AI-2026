const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;

export async function sendEmail(
  type: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    console.warn("GOOGLE_APPS_SCRIPT_URL not configured, skipping email");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Email-Secret": EMAIL_SECRET || "",
      },
      body: JSON.stringify({ type, ...data }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendRegistrationConfirmation(registration: {
  fullName: string;
  email: string;
  organization: string;
  jobTitle: string;
}) {
  return sendEmail("registration_confirmation", {
    to: registration.email,
    name: registration.fullName,
    organization: registration.organization,
    jobTitle: registration.jobTitle,
  });
}

export async function sendRegistrationApproved(registration: {
  fullName: string;
  email: string;
}) {
  return sendEmail("registration_approved", {
    to: registration.email,
    name: registration.fullName,
  });
}

export async function sendRegistrationRejected(registration: {
  fullName: string;
  email: string;
}) {
  return sendEmail("registration_rejected", {
    to: registration.email,
    name: registration.fullName,
  });
}

export async function sendCustomEmail(data: {
  to: string;
  subject: string;
  body: string;
}) {
  return sendEmail("custom", data);
}
