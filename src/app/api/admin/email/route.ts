import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { MANUAL_TEMPLATES, MAX_RECIPIENTS } from "@/lib/manualEmail";

export async function GET() {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  let cc = "";
  let contactEmail = "";
  try {
    await connectToDatabase();
    const settings = await SiteSettings.find({
      key: { $in: ["admin_cc_email", "contact_email"] },
    });
    settings.forEach((s) => {
      if (s.key === "admin_cc_email") cc = s.value;
      if (s.key === "contact_email") contactEmail = s.value;
    });
  } catch {
    // fall through with empty defaults
  }

  return NextResponse.json({
    cc,
    contactEmail,
    templates: MANUAL_TEMPLATES,
    maxRecipients: MAX_RECIPIENTS,
  });
}
