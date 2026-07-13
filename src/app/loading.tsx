'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-xl">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border-t-2 border-r-2 border-transparent border-t-ieee-blue border-r-ieee-cyan opacity-70"
        />
        
        {/* Inner glowing ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border-b-2 border-l-2 border-transparent border-b-ieee-orange border-l-ieee-cyan opacity-80"
        />

        {/* Center core pulse */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-12 h-12 bg-gradient-to-br from-ieee-blue to-ieee-cyan rounded-full blur-[8px]"
        />
        
        {/* Solid center */}
        <div className="absolute w-8 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(0,181,226,0.5)]" />

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute mt-48 text-sm font-bold tracking-[0.2em] text-ieee-blue uppercase"
        >
          Initializing Core
        </motion.div>
      </div>
    </div>
  );
}
