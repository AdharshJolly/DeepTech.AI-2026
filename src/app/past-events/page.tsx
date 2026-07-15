"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Sparkles,
  Calendar,
  Trophy,
  Mic2,
  Layers,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";


/* ────────────────────────────────────────
   DATA
   ──────────────────────────────────────── */

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
  stats: { label: string; value: string }[];
  gallery?: { src: string; alt: string }[];
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
      { label: "Speakers", value: "7" },
      { label: "Topics", value: "5" },
      { label: "Attendees", value: "200" },
    ],
    gallery: [
      {
        src: "/images/DeepTech-2025/01.jpg",
        alt: "Panel discussion at DeepTech.AI 2025",
      },
      {
        src: "/images/DeepTech-2025/02.JPG",
        alt: "AI Agents panel with industry leaders",
      },
      {
        src: "/images/DeepTech-2025/03.jpg",
        alt: "Speakers and organizers at CHRIST University",
      },
      {
        src: "/images/DeepTech-2025/04.JPG",
        alt: "Full auditorium group photo",
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
      { label: "Speakers", value: "6" },
      { label: "Topics", value: "4" },
      { label: "Attendees", value: "150" },
    ],
  },
];

const legacyStats = [
  { label: "Editions Hosted", value: 2, suffix: "+" },
  { label: "Distinguished Speakers", value: 13, suffix: "+" },
  { label: "Topics Explored", value: 9, suffix: "+" },
  { label: "Years of Legacy", value: 3, suffix: "+" },
];

/* ────────────────────────────────────────
   HOOKS
   ──────────────────────────────────────── */

/** Intersection Observer hook for reveal animations */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/** Animated counter hook */
function useCountUp(end: number, duration = 1800, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration, startOnView]);

  return { ref, count };
}

/* ────────────────────────────────────────
   SUB-COMPONENTS
   ──────────────────────────────────────── */

function MetricCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="group relative text-center px-6 py-8 md:py-10">
      <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-ieee-black leading-none tracking-tight">
        {count}
        <span className="text-ieee-orange">{suffix}</span>
      </div>
      <div className="mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-ieee-gray">
        {label}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-ieee-orange/40 group-hover:w-16 transition-all duration-300" />
    </div>
  );
}

function SpeakerCard({ speaker }: { speaker: PastSpeaker }) {
  return (
    <div className="speaker-card flex flex-col items-center text-center group">
      <div className="speaker-img-wrap relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden bg-ieee-gray/5 border border-ieee-gray/10 mb-4 shadow-sm">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            sizes="112px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="speaker-placeholder w-full h-full bg-ieee-blue/8 flex items-center justify-center">
            <Users className="w-8 h-8 text-ieee-blue/30" />
          </div>
        )}
      </div>
      <div className="speaker-info">
        <h4 className="font-heading font-bold text-sm md:text-base text-ieee-black leading-tight">
          {speaker.name}
        </h4>
        <p className="text-xs text-ieee-gray mt-1 leading-snug max-w-[180px]">
          {speaker.role}
        </p>
      </div>
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 lightbox-backdrop"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-[110] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <div
        className="relative w-[90vw] h-[70vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          sizes="90vw"
          className="object-contain"
          unoptimized
        />
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-[110] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────
   PAGE
   ──────────────────────────────────────── */

export default function PastEventsPage() {
  /* Lightbox */
  const [lightbox, setLightbox] = useState<{
    images: { src: string; alt: string }[];
    index: number;
  } | null>(null);

  const openLightbox = useCallback(
    (images: { src: string; alt: string }[], index: number) => {
      setLightbox({ images, index });
    },
    []
  );
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const nextImage = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? { ...prev, index: (prev.index + 1) % prev.images.length }
        : null
    );
  }, []);
  const prevImage = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            index:
              (prev.index - 1 + prev.images.length) % prev.images.length,
          }
        : null
    );
  }, []);

  /* Keyboard for lightbox */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, nextImage, prevImage]);

  /* Reveal refs */
  const heroRef = useReveal(0.1);
  const metricsRef = useReveal(0.15);
  const timelineRef = useReveal(0.05);

  /* Active edition index for timeline */
  const [activeEdition, setActiveEdition] = useState(0);
  const editionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = editionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) setActiveEdition(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );
    editionRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-ieee-white relative">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="hero-grid-bg relative pt-32 md:pt-40 pb-20 md:pb-28 px-5 md:px-10 lg:px-16">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-ieee-blue/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-ieee-orange/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div ref={heroRef} className="reveal">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-orange">
                <span className="w-6 h-px bg-ieee-orange" />
                IEEE Computer Society Bangalore Chapter
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-ieee-black leading-[0.95] tracking-tight"
            >
              The{" "}
              <span className="relative inline-block">
                Legacy
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-ieee-orange/40" />
              </span>
              <br />
              of DeepTech
              <span className="text-ieee-orange">.</span>AI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-ieee-gray leading-relaxed max-w-2xl font-medium"
            >
              A retrospective journey through the flagship IEEE Computer Society
              symposium — where groundbreaking research meets industry-defining
              conversations on the future of artificial intelligence.
            </motion.p>
          </div>

          {/* ── Premium Metrics ── */}
          <div
            ref={metricsRef}
            className="reveal mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-ieee-gray/10 border border-ieee-gray/10 rounded-none"
          >
            {legacyStats.map((stat, i) => (
              <MetricCard
                key={i}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-6xl" />

      {/* ═══════════════════════════════════════
          TIMELINE SPINE + EVENT CHAPTERS
          ═══════════════════════════════════════ */}
      <section className="relative px-5 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Timeline header */}
          <div ref={timelineRef} className="reveal mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-blue">
              <span className="w-6 h-px bg-ieee-blue" />
              Symposium Archive
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-heading font-black text-ieee-black tracking-tight">
              Through the Years
            </h2>
          </div>

          {/* ── Desktop/Tablet: Vertical Timeline ── */}
          <div className="hidden md:block relative">
            {/* Thick timeline line */}
            <div className="absolute left-[52px] lg:left-[60px] top-0 bottom-0 w-[2px] bg-ieee-gray/10">
              {/* Animated progress */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-ieee-blue via-ieee-cyan to-ieee-orange origin-top"
                style={{ scaleY: 1 }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Event chapters */}
            <div className="space-y-24 md:space-y-32">
              {events.map((event, idx) => (
                <div
                  key={event.year}
                  ref={(el) => { editionRefs.current[idx] = el; }}
                  className="relative"
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute left-[28px] lg:left-[36px] top-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${
                      activeEdition === idx
                        ? "bg-ieee-blue border-ieee-blue text-white shadow-lg shadow-ieee-blue/20 timeline-node-active"
                        : "bg-white border-ieee-gray/20 text-ieee-gray"
                    }`}
                  >
                    <span className="text-sm lg:text-base font-black font-heading">
                      {event.year.slice(-2)}
                    </span>
                  </div>

                  {/* Year label floating outside */}
                  <div className="absolute left-[28px] lg:left-[36px] -top-10 w-12 lg:w-14 text-center">
                    <span
                      className={`text-xs font-bold tracking-widest transition-all duration-500 ${
                        activeEdition === idx
                          ? "text-ieee-blue"
                          : "text-ieee-gray/50"
                      }`}
                    >
                      {event.year}
                    </span>
                  </div>

                  {/* Chapter content */}
                  <div className="ml-20 lg:ml-24">
                    <EventChapter
                      event={event}
                      index={idx}
                      openLightbox={openLightbox}
                    />
                  </div>
                </div>
              ))}

              {/* Future node */}
              <div className="relative">
                <div className="absolute left-[28px] lg:left-[36px] top-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-dashed border-ieee-orange/30 bg-ieee-orange/5 flex items-center justify-center z-10">
                  <Sparkles className="w-5 h-5 text-ieee-orange" />
                </div>
                <div className="ml-20 lg:ml-24">
                  <FutureCard />
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile: Horizontal Timeline + Stacked Chapters ── */}
          <div className="md:hidden">
            {/* Mobile horizontal timeline */}
            <div className="mobile-timeline-scroll flex items-center gap-6 overflow-x-auto pb-6 mb-10 -mx-5 px-5">
              {events.map((event, idx) => (
                <button
                  key={event.year}
                  onClick={() => {
                    editionRefs.current[idx]?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`mobile-timeline-node flex flex-col items-center gap-2 shrink-0 ${
                    activeEdition === idx ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black font-heading transition-all duration-300 ${
                      activeEdition === idx
                        ? "bg-ieee-blue border-ieee-blue text-white shadow-md shadow-ieee-blue/20"
                        : "bg-white border-ieee-gray/20 text-ieee-gray"
                    }`}
                  >
                    {event.year.slice(-2)}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-ieee-gray">
                    {event.year}
                  </span>
                </button>
              ))}

              {/* Future node mobile */}
              <div className="flex flex-col items-center gap-2 shrink-0 opacity-40">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-ieee-orange/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-ieee-orange" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-ieee-gray">
                  2026
                </span>
              </div>

              {/* Connecting line segments between nodes */}
              <div className="absolute inset-x-0 top-5 h-0.5 bg-ieee-gray/10 -z-10 pointer-events-none" />
            </div>

            {/* Mobile stacked chapters */}
            <div className="space-y-16">
              {events.map((event, idx) => (
                <div
                  key={event.year}
                  ref={(el) => { editionRefs.current[idx] = el; }}
                >
                  <EventChapter
                    event={event}
                    index={idx}
                    openLightbox={openLightbox}
                    mobile
                  />
                </div>
              ))}
              <FutureCard mobile />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LIGHTBOX
          ═══════════════════════════════════════ */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

    </main>
  );
}

/* ────────────────────────────────────────
   EVENT CHAPTER — Editorial Layout
   ──────────────────────────────────────── */

function EventChapter({
  event,
  index,
  openLightbox,
  mobile = false,
}: {
  event: PastEvent;
  index: number;
  openLightbox: (images: { src: string; alt: string }[], i: number) => void;
  mobile?: boolean;
}) {
  const is2025 = event.year === "2025";
  const ref = useReveal(0.1);

  return (
    <div ref={ref} className={`reveal ${is2025 ? "edition-tint-2025" : "edition-tint-2023"}`}>
      {/* ── Chapter Header ── */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-orange">
            Edition {event.year}
          </span>
          <span className="w-8 h-px bg-ieee-orange/30" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-gray/50">
            {event.date}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-ieee-black leading-[1.05] tracking-tight">
          {event.theme}
        </h2>
        <p className="mt-3 text-base md:text-lg text-ieee-gray leading-relaxed max-w-2xl font-medium">
          {event.tagline}
        </p>
      </div>

      {/* ── Immersive Banner Image ── */}
      {event.bannerImage && (
        <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] lg:aspect-[3/1] rounded-lg overflow-hidden mb-10 md:mb-14 bg-ieee-gray/5">
          <Image
            src={event.bannerImage}
            alt={`${event.year} Event Banner`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            unoptimized
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      )}

      {/* ── Content: Description + Metadata ── */}
      <div className={`${mobile ? "" : "grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"} mb-10 md:mb-14`}>
        <div className={mobile ? "" : "lg:col-span-3"}>
          <p className="text-base md:text-lg text-ieee-gray leading-relaxed font-medium">
            {event.description}
          </p>
        </div>
        <div className={`${mobile ? "mt-6" : "lg:col-span-2"} space-y-4`}>
          {/* Date */}
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-ieee-blue shrink-0" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ieee-gray/60">
                Date
              </div>
              <div className="text-sm font-semibold text-ieee-black mt-0.5">
                {event.date}
              </div>
            </div>
          </div>
          {/* Venue */}
          {event.venue && (
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-ieee-orange shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ieee-gray/60">
                  Venue
                </div>
                <div className="text-sm font-semibold text-ieee-black mt-0.5 leading-snug">
                  {event.venue}
                </div>
              </div>
            </div>
          )}
          {/* Stats row */}
          <div className="flex gap-6 pt-2">
            {event.stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-heading font-black text-ieee-black">
                  {s.value}
                  <span className="text-ieee-orange">+</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ieee-gray/60 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Core Focus Areas ── */}
      <div className="mb-10 md:mb-14">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-blue mb-6">
          <BookOpen className="w-4 h-4" />
          Core Focus Areas
        </h3>
        <div className={`${mobile ? "space-y-3" : "grid grid-cols-1 md:grid-cols-2 gap-3"}`}>
          {event.topics.map((topic, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 px-4 bg-ieee-gray/[0.03] border border-ieee-gray/[0.06] rounded-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ieee-orange shrink-0 mt-2" />
              <span className="text-sm text-ieee-gray font-medium leading-snug">
                {topic}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Speakers ── */}
      <div className="mb-10 md:mb-14">
        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-blue mb-6">
          <Mic2 className="w-4 h-4" />
          Keynote Speakers
        </h3>

        {/* Mobile: horizontal swipe carousel */}
        {mobile ? (
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
            {event.keynoteSpeakers.map((speaker, i) => (
              <div key={i} className="snap-start shrink-0 w-[140px]">
                <SpeakerCard speaker={speaker} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 lg:gap-10">
            {event.keynoteSpeakers.map((speaker, i) => (
              <SpeakerCard key={i} speaker={speaker} />
            ))}
          </div>
        )}
      </div>

      {/* ── Gallery (editorial masonry) ── */}
      {event.gallery && event.gallery.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-orange mb-6">
            <Camera className="w-4 h-4" />
            Event Moments
          </h3>

          {/* Mobile: snap gallery */}
          {mobile ? (
            <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
              {event.gallery.map((photo, i) => (
                <div
                  key={i}
                  className="gallery-item snap-start shrink-0 w-[85vw] max-w-[320px] aspect-[4/3] relative rounded-lg overflow-hidden border border-ieee-gray/10"
                  onClick={() => openLightbox(event.gallery!, i)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="85vw"
                    className="object-cover"
                    unoptimized
                  />
                  <div className="gallery-caption absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-xs text-white font-medium">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: editorial masonry */
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {event.gallery.map((photo, i) => (
                <div
                  key={i}
                  className={`gallery-item relative rounded-lg overflow-hidden border border-ieee-gray/10 ${
                    i === 0
                      ? "col-span-2 row-span-2 aspect-[4/3]"
                      : "aspect-square"
                  }`}
                  onClick={() => openLightbox(event.gallery!, i)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={i === 0 ? "600px" : "300px"}
                    className="object-cover"
                    unoptimized
                  />
                  <div className="gallery-caption absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-xs text-white font-medium">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Evolution Transition ── */}
      {!mobile && index < events.length - 1 && (
        <div className="mt-16 md:mt-20">
          <EvolutionTransition
            fromYear={events[index + 1].year}
            fromTheme={
              events[index + 1].topics[0].split(" ").slice(0, 4).join(" ") + "..."
            }
            toYear={event.year}
            toTheme={event.theme}
          />
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────
   EVOLUTION TRANSITION
   ──────────────────────────────────────── */

function EvolutionTransition({
  fromYear,
  fromTheme,
  toYear,
  toTheme,
}: {
  fromYear: string;
  fromTheme: string;
  toYear: string;
  toTheme: string;
}) {
  const ref = useReveal(0.2);
  return (
    <div ref={ref} className="reveal py-8">
      <div className="flex items-center gap-4">
        <div className="w-20 text-right">
          <span className="text-xs font-bold tracking-widest text-ieee-gray/40">
            {fromYear}
          </span>
        </div>
        <div className="flex-1 h-px bg-ieee-gray/10 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-ieee-gray/15 flex items-center justify-center">
            <span className="text-ieee-orange text-[10px]">→</span>
          </div>
        </div>
        <div className="w-20">
          <span className="text-xs font-bold tracking-widest text-ieee-blue">
            {toYear}
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-3 px-0">
        <span className="text-[10px] text-ieee-gray/50 max-w-[180px] text-right leading-snug">
          {fromTheme}
        </span>
        <span className="text-[10px] text-ieee-blue/60 max-w-[180px] text-left leading-snug">
          {toTheme}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   FUTURE CARD
   ──────────────────────────────────────── */

function FutureCard({ mobile = false }: { mobile?: boolean }) {
  const ref = useReveal(0.2);
  return (
    <div ref={ref} className="reveal">
      <div className="edition-tint-future rounded-lg border border-ieee-blue/[0.08] p-6 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-4 h-4 text-ieee-orange" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-ieee-orange">
            Coming Next
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-ieee-black leading-tight">
          DeepTech.AI 2026
        </h3>
        <p className="mt-2 text-lg md:text-xl font-heading font-bold text-ieee-blue">
          Physical AI Summit
        </p>
        <p className="mt-3 text-sm md:text-base text-ieee-gray leading-relaxed max-w-lg">
          The next chapter in our story begins October 30, 2026 in Bengaluru.
          Exploring the convergence of digital intelligence and physical systems.
        </p>
        {!mobile && (
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-ieee-blue group">
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              Learn more
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}
