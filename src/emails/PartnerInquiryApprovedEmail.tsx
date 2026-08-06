import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Button } from "@react-email/components";

interface PartnerInquiryApprovedEmailProps {
  contactPerson: string;
  organizationName: string;
  ctaUrl?: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function PartnerInquiryApprovedEmail({
  contactPerson = "Partner",
  organizationName = "Your Organization",
  ctaUrl = "https://deep-tech-ai-26.vercel.app/login",
  urlLinkedin,
  urlTwitter,
  urlInstagram,
}: PartnerInquiryApprovedEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Partnership Confirmed — DeepTech.AI 2026"
      headerTitle="Partnership Confirmed"
      headerSubtitle="DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#059669 0%,#10b981 100%)"
      urlLinkedin={urlLinkedin}
      urlTwitter={urlTwitter}
      urlInstagram={urlInstagram}
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{contactPerson}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        We are delighted to inform you that the partnership inquiry from <strong>{organizationName}</strong> has been <strong className="text-emerald-600">approved</strong>.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        Our partnerships team will be in touch with you shortly to finalize the collaboration details, including booth arrangements, branding opportunities, and event logistics.
      </Text>

      <Section className="bg-emerald-50 border border-solid border-emerald-200 rounded-lg p-4 my-5">
        <Text className="text-emerald-800 text-[14px] font-bold m-0 mb-2">Next Steps:</Text>
        <Text className="text-emerald-800 text-[14px] m-0 ml-4 mb-1">• Partnership agreement review</Text>
        <Text className="text-emerald-800 text-[14px] m-0 ml-4 mb-1">• Booth & sponsorship logistics</Text>
        <Text className="text-emerald-800 text-[14px] m-0 ml-4 mb-1">• Branding & promotional guidelines</Text>
      </Section>

      <Section className="text-center mt-8 mb-4">
        <Button
          href={ctaUrl}
          className="bg-emerald-600 text-white font-bold rounded-lg px-6 py-3 text-[14px]"
        >
          Log in to Partner Dashboard
        </Button>
      </Section>
    </BaseEmailLayout>
  );
}
