import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Row, Column, Button } from "@react-email/components";

interface RegistrationApprovedEmailProps {
  fullName: string;
  ctaUrl?: string;
  eventDate?: string;
  eventTime?: string;
  eventVenue?: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function RegistrationApprovedEmail({
  fullName = "Attendee",
  ctaUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=DeepTech.AI+2026",
  eventDate = "Friday, October 30, 2026",
  eventTime = "09:00 AM – 06:00 PM IST",
  eventVenue = "GE Healthcare, John F. Welch Technology Center, Bengaluru",
  urlLinkedin,
  urlTwitter,
  urlInstagram,
}: RegistrationApprovedEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Registration Confirmed — DeepTech.AI 2026"
      headerTitle="Registration Confirmed"
      headerSubtitle="Welcome to DeepTech.AI 2026"
      headerGradient="linear-gradient(135deg,#059669 0%,#10b981 100%)"
      urlLinkedin={urlLinkedin}
      urlTwitter={urlTwitter}
      urlInstagram={urlInstagram}
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{fullName}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        We are pleased to inform you that your registration for <strong>DeepTech.AI 2026</strong> has been <strong className="text-emerald-600">approved</strong>.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        You are now confirmed to attend the flagship IEEE CS Bangalore event on Physical AI, robotics, and industrial automation.
      </Text>

      {/* Event Details */}
      <Section className="my-6">
        <Row className="mb-2">
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Date</Text>
          </Column>
          <Column>
            <Text className="event-value text-gray-900 text-[14px] m-0">{eventDate}</Text>
          </Column>
        </Row>
        <Row className="mb-2">
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Time</Text>
          </Column>
          <Column>
            <Text className="event-value text-gray-900 text-[14px] m-0">{eventTime}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Venue</Text>
          </Column>
          <Column>
            <Text className="event-value text-gray-900 text-[14px] m-0">
              {eventVenue}
            </Text>
          </Column>
        </Row>
      </Section>

      <Section className="text-center mt-8 mb-4">
        <Button
          href={ctaUrl}
          className="bg-emerald-600 text-white font-bold rounded-lg px-6 py-3 text-[14px]"
        >
          Add to Google Calendar
        </Button>
      </Section>
    </BaseEmailLayout>
  );
}
