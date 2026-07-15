"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Clock, Activity } from "lucide-react";

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

export default function AgendaClient({ agendaItems }: { agendaItems: AgendaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    // Scrollspy behavior: updates the active index when an item enters the viewport middle.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveIndex(index);
          }
        });
      },
      {
        rootMargin: "-30% 0px -40% 0px", // The 'active' trigger zone is vertically centered
        threshold: 0.1,
      },
    );

    const currentRefs = itemRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section
      id="agenda"
      className="py-10 md:py-12 lg:py-16 bg-transparent relative z-10 min-h-[auto] md:min-h-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            October 30, 2026
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Conference Agenda
          </h2>
        </div>

        {/* Command Center Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
          {/* Connecting Circuit Line (Desktop only) */}
          <div className="hidden lg:block absolute left-[38%] top-20 bottom-20 w-px bg-linear-to-b from-transparent via-ieee-cyan/30 to-transparent"></div>

          {/* Left: Interactive List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 md:gap-6 relative z-10">
            {agendaItems.map((item, idx) => (
              <button
                key={item._id || idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`text-left p-4 md:p-5 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 border relative group overflow-hidden ${
                  activeIndex === idx
                    ? "bg-ieee-black text-white shadow-[0_20px_40px_rgba(0,181,226,0.2)] border-ieee-black lg:translate-x-4 scale-[1.02]"
                    : "bg-white/60 backdrop-blur-md text-ieee-black border-white/80 hover:border-ieee-cyan/50 shadow-sm hover:shadow-lg hover:scale-[1.01]"
                }`}
              >
                {/* Subtle active state glow */}
                {activeIndex === idx && (
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-ieee-cyan/20 blur-2xl rounded-full"></div>
                )}

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span
                    className={`font-mono text-sm md:text-base font-semibold tracking-widest ${activeIndex === idx ? "text-ieee-cyan" : "text-ieee-gray group-hover:text-ieee-cyan"}`}
                  >
                    {item.time}
                  </span>
                  {activeIndex === idx && (
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-ieee-orange animate-pulse" />
                  )}
                </div>
                <h3
                  className={`font-heading font-bold text-lg md:text-xl relative z-10 ${activeIndex === idx ? "text-white" : "text-ieee-black"}`}
                >
                  {item.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Right: Detailed View Window */}
          <div className="w-full lg:w-7/12 sticky top-32 z-10">
            {agendaItems.length > 0 && agendaItems[activeIndex] && (
              <div className="bg-white/60 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 lg:p-8 xl:p-12 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden min-h-[20rem] md:min-h-[28rem] flex flex-col justify-center">
                {/* Background Tech Accent */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-ieee-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-ieee-orange/10 rounded-full blur-3xl pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <div className="flex flex-wrap gap-4 mb-8">
                      <span className="inline-flex items-center text-xs font-bold tracking-widest text-ieee-orange border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 uppercase rounded-full shadow-sm">
                        <Clock className="w-3.5 h-3.5 mr-2" />
                        {agendaItems[activeIndex].time}
                      </span>
                      {agendaItems[activeIndex].track && (
                        <span className="inline-flex items-center text-xs font-bold tracking-widest text-ieee-blue border border-ieee-blue/30 bg-ieee-blue/5 px-4 py-2 uppercase rounded-full shadow-sm">
                          <MapPin className="w-3.5 h-3.5 mr-2" />
                          {agendaItems[activeIndex].track}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-ieee-black mb-4 md:mb-6 leading-tight">
                      {agendaItems[activeIndex].title}
                    </h2>

                    <p className="text-ieee-gray text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                      {agendaItems[activeIndex].description || "Details to be announced soon."}
                    </p>

                    {agendaItems[activeIndex].speakerName && (
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 md:p-6 rounded-3xl bg-ieee-gray/5 border border-ieee-gray/10 group">
                        <div className="w-20 h-20 rounded-2xl border border-ieee-gray/20 shadow-md bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Users className="w-8 h-8 text-ieee-gray/50" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-ieee-black mb-1">
                            {agendaItems[activeIndex].speakerName}
                          </h4>
                          <span className="text-sm font-semibold tracking-widest text-ieee-orange uppercase">
                            Featured Speaker
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
