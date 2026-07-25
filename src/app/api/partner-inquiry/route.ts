import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PartnerInquiry from "@/models/PartnerInquiry";
import { sendPartnerInquiryConfirmation } from "@/lib/email";
import { isFeatureEnabled } from "@/lib/featureFlags";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      organizationName,
      contactPerson,
      workEmail,
      designation,
      partnershipTypes,
      collaborationNotes,
      website,
      additionalNotes,
    } = body;

    if (
      !organizationName ||
      !contactPerson ||
      !workEmail ||
      !designation ||
      !partnershipTypes?.length ||
      !collaborationNotes
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const existing = await PartnerInquiry.findOne({
      workEmail: workEmail.toLowerCase(),
    });
    if (existing) {
      return NextResponse.json(
        { error: "An inquiry with this email already exists" },
        { status: 400 }
      );
    }

    const inquiry = await PartnerInquiry.create({
      organizationName: organizationName.trim(),
      contactPerson: contactPerson.trim(),
      workEmail: workEmail.toLowerCase().trim(),
      designation: designation.trim(),
      partnershipTypes,
      collaborationNotes: collaborationNotes.trim(),
      website: website?.trim() || "",
      additionalNotes: additionalNotes?.trim() || "",
    });

    // Send confirmation email only if enabled
    const emailsEnabled = await isFeatureEnabled("email-notifications");
    if (emailsEnabled) {
      sendPartnerInquiryConfirmation({
        contactPerson: inquiry.contactPerson,
        workEmail: inquiry.workEmail,
        organizationName: inquiry.organizationName,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "An inquiry with this email already exists" },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
