import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PartnerInquiry from "@/models/PartnerInquiry";
import { sendPartnerInquiryConfirmation } from "@/lib/email";
import { isFeatureEnabled } from "@/lib/featureFlags";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
      password,
    } = body;

    if (
      !organizationName ||
      !contactPerson ||
      !workEmail ||
      !designation ||
      !partnershipTypes?.length ||
      !collaborationNotes ||
      !password
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const inquiry = await PartnerInquiry.create({
      organizationName: organizationName.trim(),
      contactPerson: contactPerson.trim(),
      workEmail: workEmail.toLowerCase().trim(),
      designation: designation.trim(),
      partnershipTypes,
      collaborationNotes: collaborationNotes.trim(),
      website: website?.trim() || "",
      additionalNotes: additionalNotes?.trim() || "",
      password: hashedPassword,
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

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "partner") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Ensure the inquiry is pending before allowing updates
    const existing = await PartnerInquiry.findOne({
      workEmail: session.user.email,
    });

    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    if (existing.status !== "pending") {
      return NextResponse.json(
        { error: "You can only edit your submission while it is pending." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      organizationName,
      contactPerson,
      designation,
      partnershipTypes,
      collaborationNotes,
      website,
      additionalNotes,
    } = body;

    const updated = await PartnerInquiry.findOneAndUpdate(
      { workEmail: session.user.email },
      {
        $set: {
          ...(organizationName ? { organizationName: organizationName.trim() } : {}),
          ...(contactPerson ? { contactPerson: contactPerson.trim() } : {}),
          ...(designation ? { designation: designation.trim() } : {}),
          ...(partnershipTypes ? { partnershipTypes } : {}),
          ...(collaborationNotes ? { collaborationNotes: collaborationNotes.trim() } : {}),
          ...(website !== undefined ? { website: website.trim() } : {}),
          ...(additionalNotes !== undefined ? { additionalNotes: additionalNotes.trim() } : {}),
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
