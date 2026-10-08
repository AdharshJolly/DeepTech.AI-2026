"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  Layers,
} from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

export interface AgendaItem {
  _id?: string;
  time: string;
  title: string;
  speakerName?: string;
  track?: string;
  type: string;
  description?: string;
  order?: number;
}

interface TypeBadgeConfig {
  label: string;
  bg: string;
  border: string;
  text: string;
  nodeBorder: string;
  nodeGlow: string;
}

const getTypeBadgeProps = (type?: string): TypeBadgeConfig => {
  const t = (type || "").toLowerCase();
  switch (t) {
    case "keynote":
      return {
        label: "Keynote",
        bg: "bg-ieee-orange/10",
        border: "border-ieee-orange/30",
        text: "text-ieee-orange",
        nodeBorder: "border-ieee-orange",
        nodeGlow: "shadow-[0_0_14px_rgba(255,163,0,0.5)]",
      };
    case "panel":
      return {
        label: "Panel Discussion",
        bg: "bg-ieee-blue/10",
        border: "border-ieee-blue/30",
        text: "text-ieee-blue",
        nodeBorder: "border-ieee-blue",
        nodeGlow: "shadow-[0_0_14px_rgba(0,98,155,0.4)]",
      };
    case "workshop":
      return {
        label: "Workshop / Hands-On",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-700",
        nodeBorder: "border-purple-500",
        nodeGlow: "shadow-[0_0_14px_rgba(168,85,247,0.4)]",
      };
    case "talk":
      return {
        label: "Technical Talk",
        bg: "bg-ieee-cyan/15",
        border: "border-ieee-cyan/40",
        text: "text-[#008ba8]",
        nodeBorder: "border-ieee-cyan",
        nodeGlow: "shadow-[0_0_14px_rgba(0,181,226,0.5)]",
      };
    case "spotlight":
      return {
        label: "Spotlight",
        bg: "bg-amber-500/15",
        border: "border-amber-500/40",
        text: "text-amber-800",
        nodeBorder: "border-amber-500",
        nodeGlow: "shadow-[0_0_14px_rgba(245,158,11,0.5)]",
      };
    case "activity":
      return {
        label: "Interactive Challenge",
        bg: "bg-pink-500/10",
        border: "border-pink-500/30",
        text: "text-pink-700",
        nodeBorder: "border-pink-500",
        nodeGlow: "shadow-[0_0_14px_rgba(236,72,153,0.4)]",
      };
    case "networking":
      return {
        label: "Networking",
        bg: "bg-teal-500/10",
        border: "border-teal-500/30",
        text: "text-teal-700",
        nodeBorder: "border-teal-500",
        nodeGlow: "shadow-[0_0_14px_rgba(20,184,166,0.4)]",
      };
    case "break":
      return {
        label: "Break",
        bg: "bg-ieee-gray/10",
        border: "border-ieee-gray/30",
        text: "text-ieee-gray",
        nodeBorder: "border-ieee-gray/50",
        nodeGlow: "shadow-none",
      };
    case "closing":
      return {
        label: "Closing Session",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/30",
        text: "text-indigo-700",
        nodeBorder: "border-indigo-500",
        nodeGlow: "shadow-[0_0_14px_rgba(99,102,241,0.4)]",
      };
    default:
      return {
        label: type || "Session",
        bg: "bg-ieee-blue/10",
        border: "border-ieee-blue/30",
        text: "text-ieee-blue",
        nodeBorder: "border-ieee-blue",
        nodeGlow: "shadow-[0_0_12px_rgba(0,98,155,0.3)]",
      };
  }
};

export default function AgendaClient({
  agendaItems,
}: {
  agendaItems: AgendaItem[];
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Determine if a session has expandable details
  const isSessionExpandable = (session: AgendaItem) => {
    const hasDesc = Boolean(
      session.description && session.description.trim().length > 0
    );
    const hasSpeaker = Boolean(
      session.speakerName && session.speakerName.trim().length > 0
    );
    return hasDesc || hasSpeaker;
  };

  // Default first expandable item to be expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const firstExpandable = agendaItems.find((item) =>
      Boolean(
        (item.description && item.description.trim().length > 0) ||
          (item.speakerName && item.speakerName.trim().length > 0)
      )
    );
    return firstExpandable
      ? new Set([String(firstExpandable._id || "session-1")])
      : new Set();
  });

  // Dynamically compute category groups and live counts from agendaItems
  const categoryFilters = useMemo(() => {
    const total = agendaItems.length;
    const keynotes = agendaItems.filter((i) => i.type === "keynote").length;
    const panels = agendaItems.filter((i) => i.type === "panel").length;
    const workshopsAndTalks = agendaItems.filter((i) =>
      ["workshop", "talk", "spotlight"].includes(i.type.toLowerCase())
    ).length;
    const breaksAndNetworking = agendaItems.filter((i) =>
      ["break", "networking", "activity", "closing"].includes(
        i.type.toLowerCase()
      )
    ).length;

    const filters = [
      { id: "all", label: "All Sessions", count: total },
      ...(keynotes > 0
        ? [{ id: "keynote", label: "Keynotes", count: keynotes }]
        : []),
      ...(panels > 0 ? [{ id: "panel", label: "Panels", count: panels }] : []),
      ...(workshopsAndTalks > 0
        ? [
            {
              id: "workshops-talks",
              label: "Workshops & Talks",
              count: workshopsAndTalks,
            },
          ]
        : []),
      ...(breaksAndNetworking > 0
        ? [
            {
              id: "networking-breaks",
              label: "Networking & Breaks",
              count: breaksAndNetworking,
            },
          ]
        : []),
    ];

    return filters;
  }, [agendaItems]);

  // Filter items dynamically based on selected tab
  const filteredSessions = useMemo(() => {
    if (selectedFilter === "all") return agendaItems;
    if (selectedFilter === "keynote") {
      return agendaItems.filter((i) => i.type === "keynote");
    }
    if (selectedFilter === "panel") {
      return agendaItems.filter((i) => i.type === "panel");
    }
    if (selectedFilter === "workshops-talks") {
      return agendaItems.filter((i) =>
        ["workshop", "talk", "spotlight"].includes(i.type.toLowerCase())
      );
    }
    if (selectedFilter === "networking-breaks") {
      return agendaItems.filter((i) =>
        ["break", "networking", "activity", "closing"].includes(
          i.type.toLowerCase()
        )
      );
    }
    return agendaItems.filter((i) => i.type === selectedFilter);
  }, [agendaItems, selectedFilter]);

  const toggleSession = (id: string, title: string, canExpand: boolean) => {
    if (!canExpand) return;

    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        gaEvent({
          action: "agenda_expand",
          category: "Agenda",
          label: title,
        });
      }
      return next;
    });
  };

  const expandAll = () => {
    const allExpandableIds = filteredSessions
      .filter((session) => isSessionExpandable(session))
      .map((item, idx) => item._id || `session-${idx}`);
    setExpandedIds(new Set(allExpandableIds));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  return (
    <section
      id="agenda"
      className="py-12 md:py-20 bg-transparent relative z-10 min-h-screen"
    >
      {/* Decorative Brand Background Aura */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[500px] bg-linear-to-b from-ieee-cyan/10 via-ieee-blue/5 to-transparent rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2.5 bg-white/70 backdrop-blur-xl border border-ieee-orange/30 px-5 py-2 rounded-full mb-5 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ieee-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ieee-orange"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-ieee-black uppercase">
              October 30, 2026 • Physical AI Summit
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-ieee-black tracking-tight mb-4">
            Conference{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
              Agenda
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ieee-gray max-w-2xl mx-auto font-medium">
            Explore the full day itinerary of pioneer keynotes, embodied AI
            panels, simulator deep-dives, and networking sessions.
          </p>

          {/* Quick Controls: Expand / Collapse All */}
          <div className="flex items-center justify-center gap-4 mt-6 text-xs font-bold uppercase tracking-wider text-ieee-gray">
            <button
              onClick={expandAll}
              className="hover:text-ieee-blue transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-white/60"
            >
              <Layers className="w-3.5 h-3.5 text-ieee-cyan" />
              Expand All
            </button>
            <span className="text-ieee-gray/30">•</span>
            <button
              onClick={collapseAll}
              className="hover:text-ieee-blue transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-white/60"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {categoryFilters.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  gaEvent({
                    action: "agenda_filter",
                    category: "Agenda",
                    label: tab.label,
                  });
                }}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-ieee-black text-white shadow-[0_8px_25px_rgba(0,181,226,0.3)] scale-[1.03] border-2 border-ieee-black"
                    : "bg-white text-ieee-black border-2 border-slate-200 hover:border-ieee-cyan/60 hover:bg-slate-50 shadow-xs"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-ieee-cyan text-ieee-black font-extrabold"
                      : "bg-ieee-gray/10 text-ieee-gray"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expandable Timeline Stream */}
        <div className="relative pl-6 sm:pl-10 md:pl-12">
          {/* Cyber-Circuit Spine Path */}
          <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-6 bottom-6 w-[2px] bg-linear-to-b from-ieee-cyan via-ieee-blue/40 to-ieee-orange/60" />

          {/* Sessions List */}
          <div className="space-y-4 sm:space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredSessions.map((session, index) => {
                const sessionId = session._id || `session-${index}`;
                const canExpand = isSessionExpandable(session);
                const isExpanded = canExpand && expandedIds.has(sessionId);
                const badge = getTypeBadgeProps(session.type);

                // Parse description into bullets if it contains bullet characters
                const rawLines = (session.description || "")
                  .split("\n")
                  .map((l) => l.trim())
                  .filter(Boolean);
                const hasBullets = rawLines.some(
                  (l) =>
                    l.startsWith("•") ||
                    l.startsWith("-") ||
                    l.startsWith("*")
                );

                return (
                  <motion.div
                    key={sessionId}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    {/* Glowing Circuit Node */}
                    <div
                      className={`absolute -left-[23px] sm:-left-[31px] md:-left-[35px] top-6 w-5 h-5 rounded-full bg-white border-2 transition-all duration-300 z-10 flex items-center justify-center ${
                        isExpanded
                          ? `${badge.nodeBorder} ${badge.nodeGlow} scale-110`
                          : "border-ieee-gray/40 hover:border-ieee-cyan"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          isExpanded ? "bg-ieee-cyan" : "bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Interactive Session Card */}
                    <div
                      onClick={() =>
                        toggleSession(sessionId, session.title, canExpand)
                      }
                      className={`group rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
                        canExpand
                          ? isExpanded
                            ? "bg-white border-ieee-cyan shadow-[0_16px_40px_rgba(0,181,226,0.18)] ring-4 ring-ieee-cyan/15 cursor-pointer"
                            : "bg-white border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-ieee-cyan/60 hover:shadow-[0_12px_32px_rgba(0,181,226,0.16)] hover:-translate-y-0.5 cursor-pointer"
                          : "bg-slate-50/80 border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.04)] cursor-default"
                      }`}
                    >
                      {/* Card Header / Summary View */}
                      <div className="p-5 sm:p-6 md:p-7">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-ieee-blue flex items-center gap-1.5 bg-ieee-blue/5 border border-ieee-blue/20 px-3 py-1 rounded-full shadow-2xs">
                              <Clock className="w-3.5 h-3.5 text-ieee-blue" />
                              {session.time}
                            </span>
                            <span
                              className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-2xs ${badge.bg} ${badge.border} ${badge.text}`}
                            >
                              {badge.label}
                            </span>
                          </div>

                          {/* Venue Track & Expand Indicator */}
                          <div className="flex items-center gap-2.5 ml-auto">
                            {session.track && (
                              <span className="inline-flex items-center text-xs font-semibold text-ieee-blue bg-ieee-blue/5 border border-ieee-blue/20 px-3 py-1 rounded-full shadow-2xs">
                                <MapPin className="w-3.5 h-3.5 mr-1 text-ieee-cyan" />
                                {session.track}
                              </span>
                            )}

                            {canExpand && (
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                  isExpanded
                                    ? "bg-ieee-cyan/15 text-ieee-cyan border-ieee-cyan/40 rotate-180"
                                    : "bg-slate-100 text-slate-500 border-slate-200 group-hover:text-ieee-black group-hover:border-slate-300 group-hover:bg-slate-200"
                                }`}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className={`font-heading font-black text-lg sm:text-xl md:text-2xl text-ieee-black leading-snug transition-colors ${
                            canExpand ? "group-hover:text-ieee-blue" : ""
                          }`}
                        >
                          {session.title}
                        </h3>

                        {/* Collapsed Hint Preview (shown only when collapsed and expandable) */}
                        {canExpand && !isExpanded && session.description && (
                          <p className="text-ieee-gray text-xs sm:text-sm line-clamp-1 mt-2.5 font-normal">
                            {session.description.replace(/^[•\-*]\s*/, "")}
                          </p>
                        )}
                      </div>

                      {/* Expanded Deep-Dive Details */}
                      <AnimatePresence>
                        {isExpanded && canExpand && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="border-t-2 border-slate-100 bg-slate-50/50"
                          >
                            <div className="p-5 sm:p-6 md:p-7 pt-5 space-y-5">
                              {/* Focus Area Section */}
                              {session.description && (
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-ieee-orange mb-3 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-ieee-orange" />
                                    Session Focus & Breakdown
                                  </h4>

                                  {hasBullets ? (
                                    <div className="space-y-2.5">
                                      {rawLines.map((line, i) => {
                                        const isBullet =
                                          line.startsWith("•") ||
                                          line.startsWith("-") ||
                                          line.startsWith("*");
                                        const cleanText = isBullet
                                          ? line.replace(/^[•\-*]\s*/, "")
                                          : line;

                                        return isBullet ? (
                                          <div
                                            key={i}
                                            className="flex items-start gap-3 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-xs"
                                          >
                                            <span className="w-2 h-2 rounded-full bg-ieee-cyan mt-2 shrink-0 shadow-xs" />
                                            <span className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                                              {cleanText}
                                            </span>
                                          </div>
                                        ) : (
                                          <p
                                            key={i}
                                            className="text-sm sm:text-base text-ieee-gray leading-relaxed"
                                          >
                                            {cleanText}
                                          </p>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed whitespace-pre-line bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                                      {session.description}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Featured Speaker Section if available */}
                              {session.speakerName && (
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                                  <div className="w-12 h-12 rounded-xl bg-ieee-gray/5 border border-ieee-gray/20 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-ieee-blue" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-ieee-orange">
                                      Featured Speaker
                                    </div>
                                    <div className="font-heading font-bold text-base text-ieee-black">
                                      {session.speakerName}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredSessions.length === 0 && (
              <div className="text-center py-16 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 p-8">
                <p className="text-ieee-gray font-medium text-base">
                  No sessions found matching this category.
                </p>
                <button
                  onClick={() => setSelectedFilter("all")}
                  className="mt-4 px-5 py-2 rounded-full bg-ieee-blue text-white text-xs font-bold tracking-wider uppercase hover:bg-ieee-blue/90 transition-colors"
                >
                  View All Sessions
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
