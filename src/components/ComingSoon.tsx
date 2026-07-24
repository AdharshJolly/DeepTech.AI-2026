"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, ArrowLeft, Clock } from "lucide-react";

interface ComingSoonProps {
  title: string;
  message: string;
}

export default function ComingSoon({ title, message }: ComingSoonProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-ieee-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-ieee-orange/5 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-ieee-orange/10 text-ieee-orange px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Clock className="w-3.5 h-3.5" />
          Coming Soon
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-heading font-black text-ieee-black tracking-tight mb-6">
          {title}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
            Page
          </span>
        </h1>

        {/* Message */}
        <p className="text-lg text-ieee-gray leading-relaxed font-medium mb-10">
          {message}
        </p>

        {/* Event Info */}
        <div className="flex items-center justify-center gap-6 text-sm text-ieee-gray mb-10">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-ieee-blue" />
            Oct 30, 2026
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-ieee-orange" />
            GE Healthcare, Bengaluru
          </span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ieee-black text-white font-bold text-sm hover:bg-ieee-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </main>
  );
}
