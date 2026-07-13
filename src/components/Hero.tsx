"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-150 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Dynamic Background Design */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft glowing ambient orbs */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-ieee-blue blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.12, 0.08] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[30%] right-[-10%] w-[40%] h-[60%] rounded-full bg-ieee-cyan blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-ieee-orange blur-[120px]"
        />

        {/* Engineering Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.15]">
          <svg
            className="absolute w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hero-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-ieee-blue"
                />
                <circle cx="60" cy="60" r="1.5" className="fill-ieee-orange" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-3 bg-white/60 backdrop-blur-md border border-ieee-cyan/20 rounded-full px-4 py-1.5 mb-6 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ieee-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ieee-orange"></span>
          </span>
          <span className="text-xs font-semibold tracking-widest text-ieee-blue uppercase">
            Physical AI Summit
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-black text-ieee-black tracking-tighter mb-4 leading-none"
        >
          DeepTech
          <span className="text-transparent bg-clip-text bg-linear-to-br from-ieee-blue to-ieee-cyan">
            .ai
          </span>
          <span className="block mt-1 text-3xl md:text-5xl text-ieee-gray font-light tracking-tight">
            2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-ieee-gray mb-8 font-medium leading-relaxed"
        >
          Bridging the gap between{" "}
          <span className="text-ieee-blue font-semibold">
            digital intelligence
          </span>{" "}
          and{" "}
          <span className="text-ieee-blue font-semibold">physical systems</span>{" "}
          through robotics, hardware, and industrial automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 mb-8"
        >
          <div className="flex items-center text-ieee-black bg-white/70 px-6 py-3 rounded-full backdrop-blur-md border border-ieee-gray/20 text-sm shadow-lg">
            <Calendar className="w-4 h-4 mr-2 text-ieee-orange" aria-hidden="true" />
            <span className="font-semibold tracking-wide">30 October 2026</span>
          </div>
          <div className="flex items-center text-ieee-black bg-white/70 px-6 py-3 rounded-full backdrop-blur-md border border-ieee-gray/20 text-sm shadow-lg">
            <MapPin className="w-4 h-4 mr-2 text-ieee-orange" aria-hidden="true" />
            <span className="font-semibold tracking-wide">
              GE Healthcare, Bengaluru
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button
            disabled
            aria-label="Registrations Coming Soon"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-ieee-white transition-all duration-300 bg-ieee-gray rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-90 disabled:cursor-not-allowed uppercase tracking-widest text-xs overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-ieee-orange to-ieee-cyan opacity-20"></span>
            <span className="relative flex items-center">
              Registrations Coming Soon
              <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-50" aria-hidden="true" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
