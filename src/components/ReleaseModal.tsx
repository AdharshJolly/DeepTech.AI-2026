"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Lock } from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

interface ReleaseModalProps {
  featureName: string;
}

export default function ReleaseModal({ featureName }: ReleaseModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ieee-black/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-ieee-gray/10 text-center overflow-hidden"
      >
        {/* Decorative background gradients */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-ieee-cyan/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-ieee-orange/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon Container */}
          <motion.div 
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="w-16 h-16 rounded-2xl bg-ieee-blue/10 flex items-center justify-center text-ieee-blue mb-6 border border-ieee-blue/5"
          >
            <Lock className="w-8 h-8" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-2xl font-heading font-black text-ieee-black mb-3">
            {featureName} Page Release
          </h2>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-ieee-orange/10 text-ieee-orange mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Yet to be Published
          </span>

          {/* Description */}
          <p className="text-ieee-gray text-sm md:text-base leading-relaxed mb-8 max-w-sm">
            The {featureName.toLowerCase()} section has not been published yet. Our team is finalizing the content to bring you the best experience. Stay tuned!
          </p>

          {/* Action Button */}
          <button
            onClick={() => { gaEvent({ action: "release_modal_back", category: "Navigation", label: featureName }); router.push("/"); }}
            className="w-full flex items-center justify-center gap-2 bg-ieee-blue text-white rounded-2xl py-3 px-6 font-bold hover:bg-ieee-blue/95 transition-all shadow-lg hover:shadow-ieee-blue/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
