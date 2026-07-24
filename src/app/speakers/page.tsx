import React from "react";
import type { Metadata } from "next";
import Speakers from "@/components/Speakers";
import { isFeatureEnabled } from "@/lib/featureFlags";
import ComingSoon from "@/components/ComingSoon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Speakers | DeepTech.AI 2026",
  description:
    "Meet the distinguished speakers, industry leaders, researchers, and pioneers who are building the next generation of Physical AI and robotics at DeepTech.AI 2026.",
  alternates: { canonical: "/speakers" },
};

export default async function SpeakersPage() {
  const isEnabled = await isFeatureEnabled("speakers");

  if (!isEnabled) {
    return (
      <ComingSoon
        title="Speakers"
        message="We're curating an incredible lineup of speakers — industry leaders, researchers, and pioneers in Physical AI. Stay tuned for announcements!"
      />
    );
  }

  return (
    <main className="grow pt-20">
      <Speakers />
    </main>
  );
}
