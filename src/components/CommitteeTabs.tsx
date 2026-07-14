"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

export interface CommitteeMember {
  _id?: string;
  name: string;
  role?: string;
  affiliation?: string;
  type: string;
  linkedinUrl?: string;
  order?: number;
  imageUrl?: string;
}

export default function CommitteeTabs({
  members,
}: {
  members: CommitteeMember[];
}) {
  // Since we only have Organizing Committee, we don't need multiple tabs
  const activeMembers = members.filter((m) => m.type === "organizing");

  return (
    <div className="min-h-150 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
              
              {member.role && (
                <p className="text-sm font-semibold tracking-wide text-ieee-orange uppercase mb-3">
                  {member.role}
                </p>
              )}
              
              {member.affiliation && (
                <p className="text-sm text-ieee-gray mb-6">
                  {member.affiliation}
                </p>
              )}

              {member.linkedinUrl && (
                <div className="mt-auto flex gap-3">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-ieee-gray/5 text-ieee-gray hover:bg-ieee-blue hover:text-white transition-all hover:scale-110"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-ieee-gray py-20 font-medium">
            No committee members announced yet.
          </div>
        )}
      </motion.div>
    </div>
  );
}
