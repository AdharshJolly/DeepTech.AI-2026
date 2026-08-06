import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Bypass TLS verification for local dev
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import {
  sendRegistrationConfirmation,
  sendRegistrationApproved,
  sendRegistrationRejected,
  sendPartnerInquiryConfirmation,
  sendPartnerInquiryApproved,
  sendPartnerInquiryRejected,
} from "../src/lib/email";

import connectToDatabase from "../src/lib/db";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  try {
    // Ensure DB connection is established first
    await connectToDatabase();
    console.log("Connected to DB successfully.");

    const attendee = {
      fullName: "Amar Naik",
      email: "amar.r.naik@gmail.com",
      organization: "Tech Innovators",
      jobTitle: "Senior Developer",
    };

    const partner = {
      contactPerson: "Amar Naik",
      workEmail: "amar.r.naik@gmail.com",
      organizationName: "Tech Innovators",
    };

    console.log("Sending: Registration Confirmation...");
    await sendRegistrationConfirmation(attendee);
    await delay(3000); // 3 second delay

    console.log("Sending: Registration Approved...");
    await sendRegistrationApproved(attendee);
    await delay(3000);

    console.log("Sending: Registration Rejected...");
    await sendRegistrationRejected(attendee);
    await delay(3000);

    console.log("Sending: Partner Confirmation...");
    await sendPartnerInquiryConfirmation(partner);
    await delay(3000);

    console.log("Sending: Partner Approved...");
    await sendPartnerInquiryApproved(partner);
    await delay(3000);

    console.log("Sending: Partner Rejected...");
    await sendPartnerInquiryRejected(partner);
    
    console.log("All 6 emails sent successfully to Amar Naik!");
  } catch (err) {
    console.error("Failed to send emails:", err);
  } finally {
    process.exit(0);
  }
}

run();
