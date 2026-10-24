import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Row, Column, Button, Link } from "@react-email/components";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Gate+3+-+John+F.+Welch+Technology+Center/@12.9720464,77.7267591,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1300006b4d31:0xccab7b5cd494ac9a!8m2!3d12.9720464!4d77.7267591!16s%2Fg%2F11vzrgqm1b!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D";

interface RegistrationApprovedEmailProps {
  fullName: string;
  ctaUrl?: string;
  eventDate?: string;
  eventTime?: string;
  eventVenue?: string;
  mapsUrl?: string;
  urlWebsite?: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function RegistrationApprovedEmail({
  fullName = "Attendee",
  ctaUrl = "https://www.google.com/calendar/render?action=TEMPLATE&text=DeepTech.AI+2026",
  eventDate = "Friday, October 30, 2026",
  eventTime = "08:30 AM – 05:00 PM IST",
  eventVenue = "GE Healthcare, John F. Welch Technology Center, Bengaluru",
  mapsUrl = GOOGLE_MAPS_URL,
  urlWebsite = "https://ieeecsbangalore.org/deeptech/",
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
        <Button
          href={mapsUrl}
          className="bg-[#00629B] text-white font-bold rounded-lg px-6 py-3 text-[14px] ml-3"
        >
          View on Google Maps
        </Button>
      </Section>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        The detailed agenda and the full speaker lineup are available on our website:{" "}
        <Link href={urlWebsite} className="text-[#00629B]">
          {urlWebsite.replace(/^https?:\/\//, "")}
        </Link>
        .
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        <strong>Spread the word!</strong> Share your ticket and event details on social media, tag the IEEE CS
        Bangalore pages, and use the hashtags <strong>#IEEEDeeptech26</strong> and <strong>#PhysicalAI</strong>.
      </Text>
    </BaseEmailLayout>
  );
}
