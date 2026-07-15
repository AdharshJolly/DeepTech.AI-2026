import React from 'react';
import type { Metadata } from 'next';
import Agenda from '@/components/Agenda';
import { isFeatureEnabled } from "@/lib/featureFlags";
import ReleaseModal from "@/components/ReleaseModal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda | DeepTech.AI 2026",
  description: "Explore the comprehensive schedule of keynotes, technical deep-dives, and hands-on workshops happening across the DeepTech.AI 2026 summit.",
  alternates: { canonical: "/agenda" },
};

export default async function AgendaPage() {
  const isEnabled = await isFeatureEnabled("agenda");

  if (!isEnabled) {
    return (
      <main className="flex-grow pt-20">
        <ReleaseModal featureName="Agenda" />
      </main>
    );
  }

  return (
    <main className="flex-grow pt-20">
      <Agenda />
    </main>
  );
}

