"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-125 md:min-h-150 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Loop Video Background with Readability Mask */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/models/Hero Background.mp4" type="video/mp4" />
        </video>
        {/* Soft blur & gradient overlay for text legibility and page blending */}
        <div className="absolute inset-0 bg-linear-to-b from-white/10 via-white/70 to-ieee-white backdrop-blur-[1px] z-1" />

        {/* Subtle dot matrix overlay to give it a cyber-physical feel */}
        <div
          className="absolute inset-0 opacity-10 md:opacity-15 z-2"
          style={{
            backgroundImage: "radial-gradient(#00629B 1px, transparent 1px)",
            backgroundSize: "24px 24px md:32px 32px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center space-x-3 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-5 py-2 mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ieee-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ieee-orange"></span>
          </span>
          <span className="text-xs font-bold tracking-[0.2em] text-ieee-black uppercase">
            Physical AI Summit
          </span>
        </motion.div>

        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-ieee-black tracking-tighter mb-4 leading-none select-none">
          DeepTech
          <span className="text-transparent bg-clip-text bg-linear-to-br from-ieee-blue to-ieee-cyan">
            .AI
          </span>
          <span className="block mt-2 text-3xl md:text-6xl text-ieee-gray font-light tracking-tight opacity-80">
            2026
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ieee-gray mb-10 font-medium leading-relaxed px-4"
        >
          Bridging the gap between{" "}
          <span className="text-ieee-blue font-bold">digital intelligence</span>{" "}
          and <span className="text-ieee-blue font-bold">physical systems</span>{" "}
          through robotics, hardware, and industrial automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 w-full px-4"
        >
          <div className="flex items-center justify-center text-ieee-black bg-white/60 px-5 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-xl border border-white/80 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default w-full sm:w-auto">
            <Calendar
              className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-ieee-orange"
              aria-hidden="true"
            />
            <span className="tracking-wide">30 OCT 2026</span>
          </div>
          <div className="flex items-center justify-center text-ieee-black bg-white/60 px-5 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-xl border border-white/80 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default w-full sm:w-auto">
            <MapPin
              className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-ieee-cyan"
              aria-hidden="true"
            />
            <span className="tracking-wide">GE HEALTHCARE, BENGALURU</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <button
            disabled
            aria-label="Registrations Coming Soon"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-ieee-black rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(0,181,226,0.4)] disabled:opacity-80 disabled:cursor-not-allowed uppercase tracking-[0.2em] text-xs overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-ieee-blue/50 to-ieee-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative flex items-center">
              Registrations Coming Soon
              <ArrowRight
                className="w-4 h-4 ml-3 opacity-50"
                aria-hidden="true"
              />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
