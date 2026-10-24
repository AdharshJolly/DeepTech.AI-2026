import React from "react";
import { render } from "@react-email/render";
import RegistrationApprovedEmail from "@/emails/RegistrationApprovedEmail";
import CustomMessageEmail from "@/emails/CustomMessageEmail";
import { getGlobalEventSettings } from "@/lib/email";
import { fillName, type ManualTemplateId } from "@/lib/manualEmailShared";

export * from "@/lib/manualEmailShared";

export async function renderManualEmail(opts: {
  templateId: ManualTemplateId;
  recipientName: string;
  heading?: string;
  body?: string;
}): Promise<string> {
  const settings = await getGlobalEventSettings();
  const social = {
    urlLinkedin: settings.url_linkedin,
    urlTwitter: settings.url_twitter,
    urlInstagram: settings.url_instagram,
  };

  if (opts.templateId === "registration-confirmed") {
    return render(
      React.createElement(RegistrationApprovedEmail, {
        fullName: opts.recipientName,
        ctaUrl: settings.cta_registration_calendar,
        eventDate: settings.event_date,
        eventTime: settings.event_time,
        eventVenue: settings.event_venue,
        urlWebsite: settings.url_website,
        ...social,
      })
    );
  }

  return render(
    React.createElement(CustomMessageEmail, {
      recipientName: opts.recipientName,
      heading: opts.heading || "DeepTech.AI 2026",
      body: fillName(opts.body || "", opts.recipientName),
      ...social,
    })
  );
}
