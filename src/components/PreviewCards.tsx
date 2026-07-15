"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, User, Cpu, Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function PreviewCards() {
  return (
    <section className="py-16 md:py-24 bg-transparent border-y border-ieee-gray/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Speakers Card */}
          <div className="relative bg-white/60 backdrop-blur-xl p-6 md:p-10 lg:p-12 border border-white/80 rounded-[2rem] md:rounded-[2.5rem] shadow-xl hover:shadow-[0_20px_50px_rgba(0,181,226,0.1)] transition-all duration-500 group overflow-hidden">
            {/* Background floating icons on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-8 left-8 p-4 bg-ieee-blue/10 rounded-2xl"
              >
                <User className="w-12 h-12 text-ieee-blue" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, -10, 0], rotate: [0, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-8 right-8 p-4 bg-ieee-cyan/10 rounded-2xl"
              >
                <Bot className="w-16 h-16 text-ieee-cyan" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0], x: [0, 15, 0], rotate: [0, 20, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-1/2 right-20 p-3 bg-ieee-orange/10 rounded-xl"
              >
                <Cpu className="w-8 h-8 text-ieee-orange" />
              </motion.div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-ieee-black mb-4 group-hover:text-ieee-blue transition-colors">
                  Distinguished Speakers
                </h3>
                <p className="text-ieee-gray mb-8 leading-relaxed font-medium">
                  Meet the industry leaders, researchers, and pioneers who are
                  building the next generation of Physical AI and robotics.
                </p>
              </div>
              <div>
                <Link
                  href="/speakers"
                  className="inline-flex items-center text-ieee-blue font-bold tracking-widest uppercase text-sm group-hover:text-ieee-orange transition-colors bg-white/80 px-6 py-3 rounded-full border border-ieee-gray/20 shadow-sm hover:shadow-md"
                >
                  View All Speakers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Agenda Card */}
          <div className="relative bg-ieee-black p-6 md:p-10 lg:p-12 border border-ieee-gray/10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl hover:shadow-[0_20px_50px_rgba(0,181,226,0.15)] transition-all duration-500 group overflow-hidden">
            {/* Terminal data stream background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 overflow-hidden pointer-events-none flex flex-col font-mono text-[10px] sm:text-xs text-ieee-cyan leading-tight p-6">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              >
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="mb-2 whitespace-nowrap">
                    {`> INIT SEQUENCE ${String(i + 1).padStart(2, "0")}`}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp; {`> STATUS: ONLINE`}
                    <br />
                    {`> LOADING TRACK_0${(i % 3) + 1}... OK`}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp; {`> KERNEL PANIC: FALSE`}
                    <br />
                    {`> SYNCING NEURAL_NET_${i}... SUCCESS`}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp; {`> EXECUTE`}
                    <br />
                    <br />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-white mb-4 group-hover:text-ieee-cyan transition-colors">
                  Conference Agenda
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                  Explore our comprehensive schedule of keynotes, technical
                  deep-dives, and hands-on workshops happening across the
                  summit.
                </p>
              </div>
              <div>
                <Link
                  href="/agenda"
                  className="inline-flex items-center text-ieee-cyan font-bold tracking-widest uppercase text-sm group-hover:text-ieee-orange transition-colors bg-white/10 px-6 py-3 rounded-full border border-white/20 shadow-sm backdrop-blur-md hover:bg-white/20"
                >
                  View Full Agenda
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
