import * as React from "react";
import BaseEmailLayout from "./BaseEmailLayout";
import { Text, Section, Row, Column } from "@react-email/components";

interface RegistrationConfirmationEmailProps {
  fullName: string;
  organization: string;
  jobTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventVenue?: string;
  urlLinkedin?: string;
  urlTwitter?: string;
  urlInstagram?: string;
}

export default function RegistrationConfirmationEmail({
  fullName = "Attendee",
  organization = "Acme Corp",
  jobTitle = "Software Engineer",
  eventDate = "Friday, October 30, 2026",
  eventTime = "09:00 AM – 06:00 PM IST",
  eventVenue = "GE Healthcare, John F. Welch Technology Center, Bengaluru",
  urlLinkedin,
  urlTwitter,
  urlInstagram,
}: RegistrationConfirmationEmailProps) {
  return (
    <BaseEmailLayout
      previewText="Your Registration for DeepTech.AI 2026 Has Been Received"
      headerTitle="DeepTech.AI 2026"
      headerSubtitle="Physical AI Summit"
      headerGradient="linear-gradient(135deg,#00629B 0%,#00B5E2 100%)"
      urlLinkedin={urlLinkedin}
      urlTwitter={urlTwitter}
      urlInstagram={urlInstagram}
    >
      <Text className="text-gray-700 text-[16px] leading-[24px]">
        Dear <strong>{fullName}</strong>,
      </Text>
      
      <Text className="text-gray-700 text-[15px] leading-[24px]">
        Thank you for registering for <strong>DeepTech.AI 2026</strong>, the flagship event by IEEE Computer Society Bangalore Chapter focused on Physical AI and robotics.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        We have received your registration and our team is reviewing your submission. You will receive a confirmation email once your registration has been approved.
      </Text>

      <Text className="text-gray-700 text-[15px] leading-[24px] mt-6 mb-2">
        <strong>Registration Details:</strong>
      </Text>
      <Section className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <Row className="mb-2">
          <Column style={{ width: "35%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Name</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">{fullName}</Text>
          </Column>
        </Row>
        <Row className="mb-2">
          <Column style={{ width: "35%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Organization</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">{organization}</Text>
          </Column>
        </Row>
        <Row className="mb-2">
          <Column style={{ width: "35%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Role</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">{jobTitle}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "35%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Status</Text>
          </Column>
          <Column>
            <span className="bg-amber-100 text-amber-800 text-[12px] font-bold px-3 py-1 rounded-full">
              Pending Review
            </span>
          </Column>
        </Row>
      </Section>

      {/* Event Details */}
      <Section className="mb-6">
        <Row className="mb-2">
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Date</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">{eventDate}</Text>
          </Column>
        </Row>
        <Row className="mb-2">
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Time</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">{eventTime}</Text>
          </Column>
        </Row>
        <Row>
          <Column style={{ width: "30%" }}>
            <Text className="text-gray-500 text-[14px] font-semibold m-0">Venue</Text>
          </Column>
          <Column>
            <Text className="text-gray-900 text-[14px] m-0">
              {eventVenue}
            </Text>
          </Column>
        </Row>
      </Section>

      <Text className="text-gray-700 text-[15px] leading-[24px]">
        If you have any questions, please don't hesitate to reach out to us.
      </Text>
    </BaseEmailLayout>
  );
}
