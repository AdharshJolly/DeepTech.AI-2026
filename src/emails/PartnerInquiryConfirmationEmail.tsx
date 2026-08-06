import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Link } from "@react-email/components";

interface PartnerInquiryConfirmationEmailProps {
  contactPerson: string;
  organizationName: string;
  urlWebsite?: string;
}

export default function PartnerInquiryConfirmationEmail({
  contactPerson = "Partner",
  organizationName = "Acme Corp",
  urlWebsite = "https://deeptech.ai",
}: PartnerInquiryConfirmationEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Partnership Inquiry Received — DeepTech.AI 2026"
      headerTitle="Partnership Inquiry Received"
      headerSubtitle="DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#FFA300 0%,#F59E0B 100%)"
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{contactPerson}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        Thank you for your interest in partnering with <strong>{organizationName}</strong> for <strong>DeepTech.AI 2026</strong>.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        We have received your partnership inquiry and our partnerships team will review it thoroughly. You can expect to hear from us within <strong>3–5 business days</strong> to discuss potential collaboration opportunities.
      </Text>

      <Section className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6">
        <Text className="text-amber-900 text-[14px] m-0">
          <strong>What happens next?</strong><br />
          Our team will assess your inquiry and reach out via email or phone to explore how we can collaborate for this flagship event.
        </Text>
      </Section>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        In the meantime, feel free to learn more about the event at <Link href={urlWebsite} className="text-[#00629B]">deeptech.ai</Link>.
      </Text>
    </BaseEmailLayout>
  );
}
