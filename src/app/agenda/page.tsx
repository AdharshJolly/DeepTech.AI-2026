import React from "react";
import type { Metadata } from "next";
import Agenda from "@/components/Agenda";
import { isFeatureEnabled } from "@/lib/featureFlags";
import ComingSoon from "@/components/ComingSoon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda | DeepTech.AI 2026",
  description:
    "Explore the comprehensive schedule of keynotes, technical deep-dives, and hands-on workshops happening across the DeepTech.AI 2026 summit.",
  alternates: { canonical: "/agenda" },
};

export default async function AgendaPage() {
  const isEnabled = await isFeatureEnabled("agenda");

  if (!isEnabled) {
    return (
      <ComingSoon
        title="Agenda"
        message="We're finalizing the agenda with exciting sessions, keynotes, and hands-on workshops. Check back soon for the full schedule!"
      />
    );
  }

  return (
    <main className="flex-grow pt-20">
      <Agenda />
    </main>
  );
}
