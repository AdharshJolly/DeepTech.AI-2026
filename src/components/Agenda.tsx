"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MapPin, Clock, ArrowRight, Activity } from "lucide-react";

const agendaItems = [
  {
    time: "08:00 AM",
    title: "Registration & Networking Breakfast",
    desc: "Arrival, badge collection, and early networking over coffee. Get familiar with the venue and connect with fellow attendees.",
    location: "Atrium",
    speaker: null,
  },
  {
    time: "09:00 AM",
    title: "Keynote: The Future of Robotics in Healthcare",
    desc: "An expansive look at how autonomous systems are redefining surgical precision and patient care. Exploring the intersection of deep learning and biomechanics.",
    location: "Main Hall",
    speaker: {
      name: "Dr. Elena Rostova",
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBnnkAcWImg1e9dZiVkjBZthT8AivF5h6MY3Ymr10_eAVLcpxyIlsT60qtNU9tSIRhYDv_OqHhm5nLaOfn3MaGetpkGn5z79U8iEOjh_qDOuHCvWbnJGDmbEhqvybottq6_cjCm3FeEHfR2MoZ6aeSvl-zVopP3UxF6PwOQuajiJo7mp98HrwvQv6H0KJ1dlkZKj-LiGf62FJmtt1WOBf1PITgAhpsGCsuMv_DbGfy48PkIP5-jU1I",
    },
  },
  {
    time: "10:30 AM",
    title: "Panel: Edge Computing in Medical Imaging",
    desc: "Debating the architectural challenges of deploying heavy AI models directly onto MRI and CT hardware to minimize latency during critical procedures.",
    location: "Seminar Room A",
    speaker: {
      name: "Multiple Speakers",
      imgUrl: null,
    },
  },
  {
    time: "12:00 PM",
    title: "Networking Lunch",
    desc: "Catered lunch and technical demonstrations in the exhibition area. Connect with startups at Innovation Alley.",
    location: "Exhibition Hall",
    speaker: null,
  },
  {
    time: "01:30 PM",
    title: "Deep Dive: Synthetic Data Generation",
    desc: "Technical session on creating physically accurate synthetic datasets for training vision models when real-world corner cases are too dangerous to physically simulate.",
    location: "Lab 3",
    speaker: {
      name: "Dr. Aris Thorne",
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDSRE7bxWsFaoD3e0Czztwap9I1thbFRsyxf6wFQHp7VsKkVIz7U1_wmk-uXXSz05JQ3rsZfzygQZgl2URp0YQ8WB6ED0cvl_3Ko6VLfirZlSBESh2lX69W1nueQIXGHAtw-qr35110IGcyHBqzvVN6AtlD_x1Oils4JcuvufeiguaaWHCQmOqWEG50MrrcwhdlDsuF9_RKEE3FbbusADgI2GzTuR3ku65yM71P048S_Yysl-scDhg",
    },
  },
  {
    time: "03:00 PM",
    title: "Closing Remarks & Abstract Awards",
    desc: "Summary of the day's insights and presentation of the best technical abstract award. Final networking opportunities.",
    location: "Main Hall",
    speaker: {
      name: "Organizing Committee",
      imgUrl: null,
    },
  },
];

export default function Agenda() {
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
      className="py-16 bg-transparent relative z-10 min-h-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            October 30, 2026
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Conference Agenda
          </h2>
        </div>

        {/* Command Center Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
          {/* Connecting Circuit Line (Desktop only) */}
          <div className="hidden lg:block absolute left-[38%] top-20 bottom-20 w-px bg-linear-to-b from-transparent via-ieee-cyan/30 to-transparent"></div>

          {/* Left: Interactive List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 relative z-10">
            {agendaItems.map((item, idx) => (
              <button
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`text-left p-6 md:p-8 rounded-3xl transition-all duration-300 border relative group overflow-hidden ${
                  activeIndex === idx
                    ? "bg-ieee-black text-white shadow-2xl border-ieee-black lg:translate-x-4 scale-[1.02]"
                    : "bg-white text-ieee-black border-ieee-gray/10 hover:border-ieee-cyan/50 shadow-sm hover:shadow-md hover:scale-[1.01]"
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
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-ieee-gray/10 shadow-2xl relative overflow-hidden min-h-112.5 flex flex-col justify-center">
              {/* Background Tech Accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-ieee-cyan/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-ieee-orange/5 rounded-full blur-3xl"></div>

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
                    <span className="inline-flex items-center text-xs font-bold tracking-widest text-ieee-blue border border-ieee-blue/30 bg-ieee-blue/5 px-4 py-2 uppercase rounded-full shadow-sm">
                      <MapPin className="w-3.5 h-3.5 mr-2" />
                      {agendaItems[activeIndex].location}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-heading font-black text-ieee-black mb-6 leading-tight">
                    {agendaItems[activeIndex].title}
                  </h2>

                  <p className="text-ieee-gray text-lg leading-relaxed mb-10">
                    {agendaItems[activeIndex].desc}
                  </p>

                  {agendaItems[activeIndex].speaker && (
                    <div className="flex items-center gap-6 p-6 rounded-3xl bg-ieee-gray/5 border border-ieee-gray/10 group">
                      {agendaItems[activeIndex].speaker.imgUrl ? (
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-ieee-gray/20 shadow-md shrink-0 bg-white group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={agendaItems[activeIndex].speaker.imgUrl}
                            alt={agendaItems[activeIndex].speaker.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:grayscale-0 transition-all duration-500"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-2xl border border-ieee-gray/20 shadow-md bg-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Users className="w-8 h-8 text-ieee-gray/50" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-bold text-ieee-black mb-1">
                          {agendaItems[activeIndex].speaker.name}
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
          </div>
        </div>
      </div>
    </section>
  );
}
