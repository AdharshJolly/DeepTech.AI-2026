"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("2026-10-30T09:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days, color: "text-ieee-orange" },
    { label: "Hours", value: timeLeft.hours, color: "text-ieee-blue" },
    { label: "Minutes", value: timeLeft.minutes, color: "text-ieee-cyan" },
    { label: "Seconds", value: timeLeft.seconds, color: "text-ieee-black" },
  ];

  if (!mounted) return null;

  return (
    <section className="py-20 relative z-10 overflow-hidden bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="relative flex flex-col items-center justify-center py-10 px-4 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg group hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Subtle pulsing background behind the number */}
              <motion.div 
                key={block.value}
                className="absolute inset-0 rounded-[2rem] bg-white/40 blur-xl -z-10"
                initial={{ opacity: 0.2, scale: 0.95 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              <div className="h-16 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={block.value}
                    initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`text-5xl md:text-6xl font-mono font-black tracking-tighter ${block.color}`}
                  >
                    {String(block.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <span className="text-xs md:text-sm font-bold text-ieee-gray uppercase tracking-[0.2em] mt-4">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
