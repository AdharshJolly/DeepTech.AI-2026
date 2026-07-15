"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  BookOpen,
  Sparkles,
  Calendar,
  ChevronDown,
  ChevronRight,
  Trophy,
  Mic2,
  Layers,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PastSpeaker {
  name: string;
  role: string;
  image?: string;
}

interface PastEvent {
  year: string;
  theme: string;
  tagline: string;
  bannerImage?: string;
  description: string;
  venue?: string;
  date: string;
  topics: string[];
  keynoteSpeakers: PastSpeaker[];
  stats: { label: string; value: string; icon: React.ReactNode }[];
}

const events: PastEvent[] = [
  {
    year: "2025",
    theme: "Agentic AI & Production Systems",
    tagline:
      "Bridging the gap between conceptual AI agents and production-ready enterprise systems.",
    bannerImage:
      "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/Screenshot-2025-11-20-204547.png?fit=1825%2C738&ssl=1",
    description:
      "As artificial intelligence evolved from passive models to active decision-makers, DeepTech.AI 2025 brought together pioneers to address the shift towards Agentic AI at Scale. Hosted at Christ University, the event explored transition models, multi-agent frameworks, and strategic deployment of autonomous orchestrators.",
    date: "November 28, 2025",
    venue:
      "Auditorium, Block I, CHRIST (Deemed to be University) Bangalore Kengeri Campus",
    topics: [
      "Designing and building Multi-Agent Systems (MAS)",
      "Agent architecture & orchestration patterns",
      "Governance, verification, trust, and safety guardrails",
      "Human-in-the-Loop (HITL) interaction design",
      "High-value enterprise use cases and measuring ROI",
    ],
    keynoteSpeakers: [
      {
        name: "Dr. Srinivas Padmanabhuni",
        role: "Co-Founder and CTO, testAIng",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/im1-300x300.jpg",
      },
      {
        name: "Savitha Pareek",
        role: "Senior Solution Architect, NVIDIA",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/savitha_pareek-300x300.jpeg",
      },
      {
        name: "Pratibha Agrawal",
        role: "Engineering Director / Lead, Target",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-25-at-18.05.59-300x300.jpeg",
      },
      {
        name: "Poornapragna MS",
        role: "Technical Lead / Architect, Reliance JIO",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-25-at-18.05.25-300x300.jpeg",
      },
      {
        name: "Ashwin Swarup Adurthi",
        role: "AI Practice / Tech Leader, Arcesium",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-25-at-18.10.56-1-300x300.jpeg",
      },
      {
        name: "Ashwin Guptha",
        role: "Director - Emerging Tech, PwC",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-25-at-18.06.21-300x300.jpeg",
      },
      {
        name: "Kunal Srivastava",
        role: "Lead - AI & Cognitive Services, KPMG",
        image:
          "https://i0.wp.com/ieeecsbangalore.org/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-25-at-18.07.21-300x300.jpeg",
      },
    ],
    stats: [
      { label: "Speakers", value: "7+", icon: <Mic2 className="w-5 h-5" /> },
      { label: "Topics", value: "5", icon: <Layers className="w-5 h-5" /> },
      {
        label: "Attendees",
        value: "200+",
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
  {
    year: "2023",
    theme: "Building Trustworthiness in AI (TWAI)",
    tagline:
      "Exploring ethics, privacy, security, and social good in modern artificial intelligence.",
    venue:
      "Ericsson Research Office, Bagmane World Technology Centre, Bengaluru",
    date: "November 30, 2023",
    description:
      "Before regulations caught up with Generative AI, DeepTech.AI 2023 set the foundation for ethical machine learning. Leading minds from Microsoft Research, IISc, Intel, and TCS gathered to map out trust frameworks, discuss data privacy-preserving methods, and design robust checks for algorithmic bias.",
    topics: [
      "Ethics and regulatory compliance for global AI deployment",
      "Robustness and verification in deep neural networks",
      "Privacy-preserving machine learning & data security",
      "Generative AI governance and audit methodologies",
    ],
    keynoteSpeakers: [
      {
        name: "Monojit Choudhury",
        role: "Principal Data & Applied Scientist, Microsoft Research",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/monojitphoto-500x500.jpg",
      },
      {
        name: "Chiranjib Bhattacharya",
        role: "Professor, Indian Institute of Science (IISc)",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/chiru-500x500.jpeg",
      },
      {
        name: "Swarup Kumar Mohalik",
        role: "Principal Researcher, Ericsson Research",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/swarup-500x500.jpeg",
      },
      {
        name: "Seema Chopra",
        role: "Technical Fellow, Boeing",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/seema-413x500.jpg",
      },
      {
        name: "Sameep Mehta",
        role: "Distinguished Engineer, IBM",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/sameep.jpeg",
      },
      {
        name: "Gopalan Oppiliappan",
        role: "Head, AI Center of Excellence, Intel",
        image:
          "https://cs.ieeebangalore.org/wp-content/uploads/2023/11/gopalan.jpeg",
      },
    ],
    stats: [
      { label: "Speakers", value: "6+", icon: <Mic2 className="w-5 h-5" /> },
      { label: "Topics", value: "4", icon: <Layers className="w-5 h-5" /> },
      {
        label: "Attendees",
        value: "150+",
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
];

const legacyStats = [
  {
    label: "Editions Hosted",
    value: "2+",
    icon: <Trophy className="w-6 h-6 text-ieee-orange" />,
  },
  {
    label: "Distinguished Speakers",
    value: "13+",
    icon: <Mic2 className="w-6 h-6 text-ieee-cyan" />,
  },
  {
    label: "Topics Explored",
    value: "9+",
    icon: <Layers className="w-6 h-6 text-ieee-blue" />,
  },
  {
    label: "Years of Legacy",
    value: "3+",
    icon: <Sparkles className="w-6 h-6 text-ieee-orange" />,
  },
];

export default function PastEventsPage() {
  const [expandedYears, setExpandedYears] = useState<string[]>(events.map((e) => e.year));

  const toggleYear = (year: string) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <main className="min-h-screen bg-ieee-white flex flex-col pt-24 relative overflow-hidden">
      <Navbar />

      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-5 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-5 w-96 h-96 bg-ieee-orange/5 rounded-full blur-[150px]" />
      </div>

      <section className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12 max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-ieee-orange/10 text-ieee-orange border border-ieee-orange/20 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Symposium Legacy
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight leading-none mb-6">
            DeepTech.AI{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
              Chronicles
            </span>
          </h1>
          <p className="text-lg md:text-xl text-ieee-gray leading-relaxed font-medium">
            A comprehensive look at the topics, research breakthroughs, and
            keynote speakers from past iterations of the flagship IEEE Computer
            Society Bangalore Chapter symposium.
          </p>
        </motion.div>

        {/* Legacy Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {legacyStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl border border-ieee-gray/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-ieee-gray/5 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black font-heading text-ieee-black leading-none">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-ieee-gray uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated Gradient Timeline Line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5">
            <div className="h-full bg-linear-to-b from-ieee-cyan/40 via-ieee-blue/20 to-ieee-orange/40 rounded-full" />
          </div>

          <div className="space-y-6">
            {events.map((event, idx) => {
              const isExpanded = expandedYears.includes(event.year);

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-2 top-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-ieee-gray/15 flex items-center justify-center shadow-lg z-10 transition-all duration-300 hover:border-ieee-cyan hover:shadow-ieee-cyan/20">
                    <span className="text-sm md:text-base font-black font-heading text-ieee-black">
                      {event.year.slice(-2)}
                    </span>
                  </div>

                  {/* Event Card */}
                  <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-ieee-gray/10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Clickable Header */}
                    <button
                      onClick={() => toggleYear(event.year)}
                      className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-ieee-orange">
                            {event.year} Edition
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ieee-gray font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.date}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black font-heading text-ieee-black leading-tight group-hover:text-ieee-blue transition-colors">
                          {event.theme}
                        </h2>
                        <p className="text-sm text-ieee-gray mt-1.5 line-clamp-1 md:line-clamp-none">
                          {event.tagline}
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-3 mt-4">
                          {event.stats.map((s, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ieee-gray/5 text-xs font-bold text-ieee-gray"
                            >
                              <span className="text-ieee-blue">{s.icon}</span>
                              <span className="text-ieee-black">{s.value}</span>
                              {s.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 w-10 h-10 rounded-full bg-ieee-gray/5 flex items-center justify-center group-hover:bg-ieee-cyan/10 transition-colors"
                      >
                        <ChevronDown className="w-5 h-5 text-ieee-gray" />
                      </motion.div>
                    </button>

                    {/* Expandable Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 md:px-8 pb-8 border-t border-ieee-gray/10">
                            {/* Banner Image */}
                            {event.bannerImage && (
                              <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-ieee-gray/10 shadow-md bg-ieee-gray/5 mt-6 mb-6">
                                <Image
                                  src={event.bannerImage}
                                  alt={`${event.year} Event Banner`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 900px"
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}

                            {/* Description */}
                            <p className="text-base text-ieee-gray leading-relaxed font-medium mb-6">
                              {event.description}
                            </p>

                            {/* Venue & Date (mobile visible) */}
                            <div className="flex flex-wrap gap-4 mb-6 text-sm text-ieee-gray font-medium">
                              <span className="sm:hidden inline-flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-ieee-blue" />
                                {event.date}
                              </span>
                              {event.venue && (
                                <span className="inline-flex items-start gap-1.5">
                                  <MapPin className="w-4 h-4 text-ieee-orange shrink-0 mt-0.5" />
                                  {event.venue}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Focus Areas */}
                              <div className="bg-ieee-gray/5 rounded-2xl p-6 border border-ieee-gray/10">
                                <h3 className="text-sm font-bold text-ieee-black uppercase tracking-wider flex items-center gap-2 mb-4">
                                  <BookOpen className="w-4 h-4 text-ieee-cyan" />
                                  Core Focus Areas
                                </h3>
                                <ul className="space-y-3">
                                  {event.topics.map((topic, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2.5 text-sm text-ieee-gray font-medium"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-ieee-orange shrink-0 mt-2" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Speakers */}
                              <div>
                                <h3 className="text-sm font-bold text-ieee-black uppercase tracking-wider flex items-center gap-2 mb-4">
                                  <Users className="w-4 h-4 text-ieee-blue" />
                                  Featured Speakers
                                </h3>
                                {/* Horizontal scroll speaker strip */}
                                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scrollbar-hide">
                                  {event.keynoteSpeakers.map((speaker, i) => (
                                    <div
                                      key={i}
                                      className="bg-white p-4 rounded-2xl border border-ieee-gray/5 shadow-xs hover:border-ieee-cyan/20 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center min-w-[140px] max-w-[160px] snap-start shrink-0"
                                    >
                                      {speaker.image ? (
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-ieee-gray/5 mb-3">
                                          <Image
                                            src={speaker.image}
                                            alt={speaker.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                            unoptimized
                                          />
                                        </div>
                                      ) : (
                                        <div className="w-16 h-16 rounded-full bg-ieee-blue/10 flex items-center justify-center shrink-0 mb-3">
                                          <Users className="w-6 h-6 text-ieee-blue" />
                                        </div>
                                      )}
                                      <h4 className="font-bold text-ieee-black text-sm leading-tight">
                                        {speaker.name}
                                      </h4>
                                      <p className="text-[11px] text-ieee-gray mt-1 leading-snug line-clamp-2">
                                        {speaker.role}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline End Node */}
          <div className="relative pl-16 md:pl-20 mt-6">
            <div className="absolute left-0 md:left-2 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-ieee-orange/10 border-2 border-dashed border-ieee-orange/30 flex items-center justify-center z-10">
              <Sparkles className="w-5 h-5 text-ieee-orange" />
            </div>
            <div className="bg-linear-to-r from-ieee-blue/5 to-ieee-cyan/5 rounded-2xl border border-ieee-blue/10 p-6 ml-0">
              <p className="text-sm font-bold text-ieee-blue uppercase tracking-wider mb-1">
                Coming Next
              </p>
              <p className="text-lg font-heading font-black text-ieee-black">
                DeepTech.AI 2026 — Physical AI Summit
              </p>
              <p className="text-sm text-ieee-gray mt-1">
                The next chapter begins October 30, 2026 in Bengaluru.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
