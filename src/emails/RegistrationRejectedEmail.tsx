import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Link } from "@react-email/components";

interface RegistrationRejectedEmailProps {
  fullName: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  contactEmail?: string;
}

export default function RegistrationRejectedEmail({
  fullName = "Attendee",
  urlLinkedin = "https://www.linkedin.com/company/ieeecsbc/",
  urlTwitter = "https://twitter.com/ieeecsbc",
  contactEmail = "ieee.deeptech@gmail.com",
}: RegistrationRejectedEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Update on Your DeepTech.AI 2026 Registration"
      headerTitle="Registration Update"
      headerSubtitle="DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#4B5563 0%,#6B7280 100%)"
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{fullName}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        Thank you for your interest in <strong>DeepTech.AI 2026</strong>. We appreciate you taking the time to register for our event.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        After careful review, we regret to inform you that we are unable to accommodate your registration at this time due to limited capacity.
      </Text>

      <Section className="bg-gray-100 border border-gray-200 rounded-xl p-4 my-6">
        <Text className="text-gray-700 text-[14px] m-0">
          <strong>Alternative options:</strong><br />
          You may follow us on <Link href={urlLinkedin} className="text-[#00629B]">LinkedIn</Link> or <Link href={urlTwitter} className="text-[#00629B]">X (Twitter)</Link> for updates on future events and opportunities.
        </Text>
      </Section>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        If you believe this is an error, please contact us at <Link href={`mailto:${contactEmail}`} className="text-[#00629B]">{contactEmail}</Link>.
      </Text>
    </BaseEmailLayout>
  );
}
