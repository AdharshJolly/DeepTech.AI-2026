import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Link } from "@react-email/components";

interface PartnerInquiryRejectedEmailProps {
  contactPerson: string;
  organizationName: string;
  urlLinkedin?: string;
  contactEmail?: string;
}

export default function PartnerInquiryRejectedEmail({
  contactPerson = "Partner",
  organizationName = "Acme Corp",
  urlLinkedin = "https://www.linkedin.com/company/ieeecsbc/",
  contactEmail = "ieee.deeptech@gmail.com",
}: PartnerInquiryRejectedEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Partnership Inquiry Update — DeepTech.AI 2026"
      headerTitle="Partnership Inquiry Update"
      headerSubtitle="DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#4B5563 0%,#6B7280 100%)"
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{contactPerson}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        Thank you for your interest in partnering with <strong>{organizationName}</strong> for <strong>DeepTech.AI 2026</strong>.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        After careful consideration, we regret to inform you that we are unable to proceed with this partnership at this time. Our partnership slots for this event have been finalized.
      </Text>

      <Section className="bg-gray-100 border border-gray-200 rounded-xl p-4 my-6">
        <Text className="text-gray-700 text-[14px] m-0">
          <strong>Stay Connected:</strong><br />
          We encourage you to follow us on <Link href={urlLinkedin} className="text-[#00629B]">LinkedIn</Link> for updates on future events and partnership opportunities.
        </Text>
      </Section>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        If you have any questions, please contact us at <Link href={`mailto:${contactEmail}`} className="text-[#00629B]">{contactEmail}</Link>.
      </Text>
    </BaseEmailLayout>
  );
}
