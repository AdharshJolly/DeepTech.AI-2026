import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { MapPin, Users, BookOpen, Sparkles, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Past Events | DeepTech.ai 2026",
  description:
    "Explore the legacy, core highlights, notable speakers, and photos from the previous annual symposiums of the IEEE Computer Society Bangalore Chapter.",
  alternates: { canonical: "/past-events" },
};

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
}

export default function PastEventsPage() {
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
    },
  ];

  return (
    <main className="min-h-screen bg-ieee-white flex flex-col pt-24 relative overflow-hidden">
      <Navbar />

      {/* Modern Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-5 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-5 w-96 h-96 bg-ieee-orange/5 rounded-full blur-[150px]" />
      </div>

      <section className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        {/* Header */}
        <div className="text-left mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-ieee-orange/10 text-ieee-orange border border-ieee-orange/20 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Symposium Legacy
          </span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-ieee-black tracking-tight leading-none mb-6">
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
        </div>

        {/* Structured Timeline Container */}
        <div className="relative border-l-2 border-ieee-gray/10 ml-4 md:ml-12 pl-6 md:pl-16 space-y-32">
          {events.map((event) => (
            <div key={event.year} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] md:-left-[71px] top-2 w-14 h-14 rounded-full bg-white border-2 border-ieee-gray/10 flex items-center justify-center shadow-lg group-hover:border-ieee-cyan transition-colors duration-300 z-20">
                <span className="text-base font-black font-heading text-ieee-black">
                  {event.year}
                </span>
              </div>

              {/* Event card grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Meta details (Spans 4 columns) */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
                  <div className="space-y-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-ieee-orange">
                      {event.year} Edition
                    </span>
                    <h2 className="text-3xl font-black font-heading text-ieee-black leading-tight">
                      {event.theme}
                    </h2>
                  </div>

                  <p className="text-sm font-semibold text-ieee-gray leading-relaxed">
                    {event.tagline}
                  </p>

                  <div className="pt-4 border-t border-ieee-gray/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-ieee-gray font-medium">
                      <Calendar className="w-4 h-4 text-ieee-blue shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-start gap-2 text-xs md:text-sm text-ieee-gray font-medium">
                        <MapPin className="w-4 h-4 text-ieee-orange shrink-0 mt-0.5" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content block (Spans 8 columns) */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Banner Image */}
                  {event.bannerImage && (
                    <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-ieee-gray/10 shadow-md bg-ieee-gray/5 group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={event.bannerImage}
                        alt={`${event.year} Event Banner`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Summary Description */}
                  <p className="text-base md:text-lg text-ieee-gray leading-relaxed font-medium">
                    {event.description}
                  </p>

                  {/* Focus Areas Card */}
                  <div className="bg-white/60 backdrop-blur-xl border border-ieee-gray/10 p-8 rounded-[2rem] shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-ieee-black uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-ieee-cyan" /> Core Focus
                      Areas
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-ieee-gray font-medium">
                      {event.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-ieee-orange shrink-0 mt-2" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Speakers Card Grid */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-ieee-black uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-ieee-blue" /> Featured
                      Panelists & Speakers
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.keynoteSpeakers.map((speaker, i) => (
                        <div
                          key={i}
                          className="bg-white p-5 rounded-2xl border border-ieee-gray/5 shadow-xs hover:border-ieee-cyan/20 hover:shadow-md transition-all duration-300 flex items-center gap-4"
                        >
                          {speaker.image ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md bg-ieee-gray/5">
                              <Image
                                src={speaker.image}
                                alt={speaker.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-ieee-blue/10 flex items-center justify-center shrink-0">
                              <Users className="w-6 h-6 text-ieee-blue" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <h4 className="font-bold text-ieee-black text-base truncate">
                              {speaker.name}
                            </h4>
                            <p className="text-xs text-ieee-gray mt-0.5 leading-normal truncate">
                              {speaker.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
