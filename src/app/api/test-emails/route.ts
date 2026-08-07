import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import RegistrationApprovedEmail from "@/emails/RegistrationApprovedEmail";
import PartnerInquiryApprovedEmail from "@/emails/PartnerInquiryApprovedEmail";
import React from "react";

// Bypass local SSL cert issues for testing fetch to Google Apps Script
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET() {
  const targetEmail = "adharshjolly23@gmail.com";

  try {
    // 1. Render Registration Approved Email
    const registrationHtml = await render(
      React.createElement(RegistrationApprovedEmail, {
        fullName: "Adharsh Jolly"
      })
    );

    await sendEmail({
      to: targetEmail,
      subject: "[TEST] Registration Confirmed — DeepTech.AI 2026",
      html: registrationHtml,
      type: "registration_confirmation",
    });

    // 2. Render Partner Approved Email
    const partnerHtml = await render(
      React.createElement(PartnerInquiryApprovedEmail, {
        contactPerson: "Adharsh Jolly",
        organizationName: "Test Innovations Inc.",
      })
    );

    await sendEmail({
      to: targetEmail,
      subject: "[TEST] Partnership Confirmed — DeepTech.AI 2026",
      html: partnerHtml,
      type: "partner_inquiry_confirmation",
    });

    return NextResponse.json({ success: true, message: "Test emails delivered successfully!" });
  } catch (error: unknown) {
    console.error("Test email failed:", error);
    const message = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
