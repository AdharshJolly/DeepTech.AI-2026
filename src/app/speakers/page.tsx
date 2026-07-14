import React from "react";
import type { Metadata } from "next";
import Speakers from "@/components/Speakers";

export const metadata: Metadata = {
  title: "Speakers | DeepTech.ai 2026",
  description: "Meet the distinguished speakers, industry leaders, researchers, and pioneers who are building the next generation of Physical AI and robotics at DeepTech.ai 2026.",
  alternates: { canonical: "/speakers" },
};

export default function SpeakersPage() {
  return (
    <main className="grow pt-20">
      <Speakers />
    </main>
  );
}
