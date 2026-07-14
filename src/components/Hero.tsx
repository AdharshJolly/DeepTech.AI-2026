"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

// Cybernetic decoding text effect
const ScrambleText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      let iteration = 0;
      intervalId = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );
        if (iteration >= text.length && intervalId) clearInterval(intervalId);
        iteration += 1 / 5;
      }, 60);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay]);

  return <>{displayText || " "}</>;
};

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-80px)] min-h-150 flex items-center justify-center overflow-hidden bg-transparent">
      {/* Fluid Gradient Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-ieee-blue/40 blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-ieee-cyan/30 blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{
            x: [0, 50, -100, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[20%] w-[70%] h-[50%] rounded-full bg-ieee-orange/20 blur-[120px] mix-blend-multiply"
        />

        {/* Subtle dot matrix overlay to give it a cyber-physical feel */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#00629B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pb-8">
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
            <ScrambleText text="Physical AI Summit" delay={100} />
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black text-ieee-black tracking-tighter mb-4 leading-none select-none">
          <ScrambleText text="DeepTech" delay={400} />
          <span className="text-transparent bg-clip-text bg-linear-to-br from-ieee-blue to-ieee-cyan">
            <ScrambleText text=".ai" delay={1200} />
          </span>
          <span className="block mt-2 text-4xl md:text-6xl text-ieee-gray font-light tracking-tight opacity-80">
            <ScrambleText text="2026" delay={1800} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-ieee-gray mb-10 font-medium leading-relaxed"
        >
          Bridging the gap between{" "}
          <span className="text-ieee-blue font-bold">digital intelligence</span>{" "}
          and <span className="text-ieee-blue font-bold">physical systems</span>{" "}
          through robotics, hardware, and industrial automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10"
        >
          <div className="flex items-center text-ieee-black bg-white/60 px-6 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-xl border border-white/80 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
            <Calendar
              className="w-5 h-5 mr-3 text-ieee-orange"
              aria-hidden="true"
            />
            <span className="tracking-wide">30 OCT 2026</span>
          </div>
          <div className="flex items-center text-ieee-black bg-white/60 px-6 py-3 md:px-8 md:py-4 rounded-full backdrop-blur-xl border border-white/80 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
            <MapPin
              className="w-5 h-5 mr-3 text-ieee-cyan"
              aria-hidden="true"
            />
            <span className="tracking-wide">GE HEALTHCARE, BENGALURU</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.6, ease: "easeOut" }}
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
