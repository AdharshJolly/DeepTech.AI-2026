"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
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
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[8rem] md:text-[10rem] font-heading font-black text-transparent bg-clip-text bg-linear-to-br from-ieee-blue to-ieee-cyan leading-none select-none">
            404
          </span>
        </motion.div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-heading font-black text-ieee-black mb-4">
          Page Not Found
        </h1>
        <p className="text-ieee-gray text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ieee-gray/10 text-ieee-black font-bold text-sm hover:bg-ieee-gray/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ieee-blue text-white font-bold text-sm hover:bg-ieee-blue/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
