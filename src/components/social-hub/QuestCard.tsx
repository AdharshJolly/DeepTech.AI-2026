"use client";

import { Award, CheckCircle } from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

interface Quest {
  id: string;
  title: string;
  points: number;
  description: string;
  actionText: string;
  shareUrl: string;
}

interface QuestCardProps {
  quest: Quest;
  isCompleted: boolean;
}

export default function QuestCard({ quest, isCompleted }: QuestCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50/10"
          : "border-ieee-gray/10"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isCompleted
              ? "bg-emerald-100 text-emerald-600"
              : "bg-ieee-orange/10 text-ieee-orange"
          }`}
        >
          {isCompleted ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Award className="w-6 h-6" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-ieee-black leading-tight">
              {quest.title}
            </h3>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                isCompleted
                  ? "bg-emerald-200/50 text-emerald-700"
                  : "bg-ieee-blue/15 text-ieee-blue"
              }`}
            >
              +{quest.points} PTS
            </span>
          </div>
          <p className="text-sm text-ieee-gray mt-1 leading-normal">
            {quest.description}
          </p>
        </div>
      </div>
      <a
        href={quest.shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          gaEvent({
            action: "quest_link_click",
            category: "Social Hub",
            label: quest.id,
          })
        }
        className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-center text-sm font-bold transition-all shrink-0 ${
          isCompleted
            ? "bg-emerald-100 text-emerald-800 pointer-events-none cursor-default"
            : "bg-ieee-black text-white hover:bg-ieee-blue"
        }`}
      >
        {isCompleted ? "Quest Claimed" : quest.actionText}
      </a>
    </div>
  );
}
