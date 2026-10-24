import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text } from "@react-email/components";

interface CustomMessageEmailProps {
  recipientName: string;
  heading: string;
  body: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function CustomMessageEmail({
  recipientName = "Attendee",
  heading = "DeepTech.AI 2026",
  body = "Your message goes here.",
  urlLinkedin,
  urlTwitter,
  urlInstagram,
}: CustomMessageEmailProps) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <BaseEmailLayout
      previewText={heading}
      headerTitle={heading}
      headerSubtitle="DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#00629B 0%,#00B5E2 100%)"
      urlLinkedin={urlLinkedin}
      urlTwitter={urlTwitter}
      urlInstagram={urlInstagram}
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{recipientName}</strong>,
      </Text>

      {paragraphs.map((paragraph, i) => (
        <Text
          key={i}
          className="text-gray-700 text-[15px] leading-[24px]"
          style={{ whiteSpace: "pre-line" }}
        >
          {paragraph}
        </Text>
      ))}
    </BaseEmailLayout>
  );
}
