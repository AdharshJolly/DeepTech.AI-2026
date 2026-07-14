"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Globe } from "lucide-react";
import Image from "next/image";

const COMMITTEES = [
  { id: "organizing", label: "Organizing Committee" },
  { id: "technical", label: "Technical Program Committee" },
  { id: "advisory", label: "Advisory Board" },
];

export interface CommitteeMember {
  _id?: string;
  name: string;
  role: string;
  affiliation: string;
  type: string;
  order?: number;
  imageUrl?: string;
}

export default function CommitteeTabs({
  members,
}: {
  members: CommitteeMember[];
}) {
  const [activeTab, setActiveTab] = useState(COMMITTEES[0].id);

  // Filter members based on active tab
  const activeMembers = members.filter((m) => m.type === activeTab);

  return (
    <>
      {/* Custom Tabs */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-ieee-gray/5 p-1.5 rounded-full border border-ieee-gray/10 shadow-inner overflow-x-auto max-w-full">
          {COMMITTEES.map((committee) => (
            <button
              key={committee.id}
              onClick={() => setActiveTab(committee.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
                activeTab === committee.id
                  ? "text-white"
                  : "text-ieee-gray hover:text-ieee-blue"
              }`}
            >
              {activeTab === committee.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-ieee-blue rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
              <span className="relative z-10">{committee.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-150 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {activeMembers.length > 0 ? (
              activeMembers.map((member) => (
                <div
                  key={member._id}
                  className="group bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-ieee-gray/5 mb-6 flex items-center justify-center border-4 border-white shadow-md group-hover:border-ieee-cyan/20 transition-colors overflow-hidden relative">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-ieee-gray/40" />
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-ieee-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold tracking-wide text-ieee-orange uppercase mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-ieee-gray mb-6">
                    {member.affiliation}
                  </p>

                  <div className="mt-auto flex gap-3">
                    <button
                      className="p-2 rounded-full bg-ieee-gray/5 text-ieee-gray/40 hover:bg-ieee-blue hover:text-white transition-colors cursor-not-allowed"
                      disabled
                      aria-label="Mail Profile"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-ieee-gray/5 text-ieee-gray/40 hover:bg-ieee-cyan hover:text-white transition-colors cursor-not-allowed"
                      disabled
                      aria-label="Website"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-ieee-gray py-20 font-medium">
                No committee members announced for this track yet.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
