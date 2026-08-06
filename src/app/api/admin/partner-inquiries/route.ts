import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import PartnerInquiry from "@/models/PartnerInquiry";
import {
  sendPartnerInquiryApproved,
  sendPartnerInquiryRejected,
} from "@/lib/email";
import { isFeatureEnabled } from "@/lib/featureFlags";

export async function GET() {
  const { error } = await requirePermission("partners", "read");
  if (error) return error;

  try {
    await connectToDatabase();
    const inquiries = await PartnerInquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { error } = await requirePermission("partners", "update");
  if (error) return error;

  try {
    await connectToDatabase();
    const { id, status, adminFeedback } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    const updateData: { status?: string; adminFeedback?: string } = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      updateData.status = status;
    }
    if (adminFeedback !== undefined) {
      updateData.adminFeedback = adminFeedback;
    }

    const updated = await PartnerInquiry.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    // Send email notification only if enabled and status was updated
    if (status) {
      const emailsEnabled = await isFeatureEnabled("email-notifications");
      if (emailsEnabled) {
        const emailData = {
          contactPerson: updated.contactPerson,
          workEmail: updated.workEmail,
          organizationName: updated.organizationName,
        };

        if (status === "approved") {
          sendPartnerInquiryApproved(emailData).catch(() => {});
        } else if (status === "rejected") {
          sendPartnerInquiryRejected(emailData).catch(() => {});
        }
      }
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
