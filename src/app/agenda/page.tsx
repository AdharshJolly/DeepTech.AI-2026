import React from 'react';
import type { Metadata } from 'next';
import Agenda from '@/components/Agenda';

export const metadata: Metadata = {
  title: "Agenda | DeepTech.ai 2026",
  description: "Explore the comprehensive schedule of keynotes, technical deep-dives, and hands-on workshops happening across the DeepTech.ai 2026 summit.",
  alternates: { canonical: "/agenda" },
};

export default function AgendaPage() {
  return (
    <main className="flex-grow pt-20">
      <Agenda />
    </main>
  );
}
