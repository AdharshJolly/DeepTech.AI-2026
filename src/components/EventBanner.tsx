"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function EventBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Mobile: square banner */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl md:hidden">
        <Image
          src="/images/Banners/1254x1254.jpeg"
          alt="DeepTech.AI 2026 - Where Digital Intelligence Meets the Physical World"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Desktop: wide landscape banner */}
      <div className="relative w-full aspect-[1600/639] overflow-hidden rounded-2xl hidden md:block">
        <Image
          src="/images/Banners/1600x639.jpeg"
          alt="DeepTech.AI 2026 - Where Digital Intelligence Meets the Physical World"
          fill
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}
