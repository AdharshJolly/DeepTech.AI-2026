"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Calendar, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface AgendaErrorProps {
  type?: "fetch_error" | "empty";
  message?: string;
}

export default function AgendaError({
  type = "fetch_error",
  message,
}: AgendaErrorProps) {
  const isFetchError = type === "fetch_error";

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[120px] ${
            isFetchError ? "bg-red-500/5" : "bg-ieee-blue/5"
          }`}
        />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-ieee-cyan/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${
            isFetchError
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-ieee-blue/5 text-ieee-blue border-ieee-blue/20"
          }`}
        >
          {isFetchError ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : (
            <Clock className="w-4 h-4 text-ieee-blue" />
          )}
          {isFetchError ? "Database Connection Error" : "Schedule Updating"}
        </div>

        {/* Title */}
        <h2 className="font-heading font-black text-3xl sm:text-4xl text-ieee-black mb-4 tracking-tight">
          {isFetchError ? "Unable to Load Agenda" : "No Sessions Scheduled"}
        </h2>

        {/* Description */}
        <p className="text-ieee-gray text-base sm:text-lg leading-relaxed mb-8">
          {message ||
            (isFetchError
              ? "We encountered a temporary issue retrieving the schedule from the database. Please try reloading or check back in a few moments."
              : "The summit schedule is currently being finalized in the system. Please check back shortly.")}
        </p>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 mb-8 py-3 px-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-ieee-blue" />
            October 30, 2026
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-ieee-orange" />
            GE Healthcare, Bengaluru
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ieee-blue text-white font-bold text-sm hover:bg-[#004e7c] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Retry / Reload
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
