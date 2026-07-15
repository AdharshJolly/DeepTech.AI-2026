import React from "react";
import type { Metadata } from "next";

import connectToDatabase from "@/lib/db";
import Committee from "@/models/Committee";
import CommitteeTabs from "@/components/CommitteeTabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Committee | DeepTech.AI 2026",
  description:
    "Meet the dedicated individuals driving the vision, technical excellence, and execution of DeepTech.AI 2026.",
  alternates: { canonical: "/committee" },
};

export default async function CommitteePage() {
  await connectToDatabase();

  // Fetch all committee members
  const members = await Committee.find().sort({ order: 1 }).lean();

  // Serialize IDs for Client Component
  const serializedMembers = members.map((member) => ({
    ...member,
    _id: (member._id as { toString(): string }).toString(),
  }));

  return (
    <main className="min-h-screen bg-ieee-white flex flex-col pt-24">
      <section className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-ieee-black tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-500">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
              Committees
            </span>
          </h1>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            Meet the dedicated individuals driving the vision, technical
            excellence, and execution of DeepTech.AI 2026.
          </p>
        </div>

        <CommitteeTabs members={serializedMembers} />
      </section>
    </main>
  );
}
