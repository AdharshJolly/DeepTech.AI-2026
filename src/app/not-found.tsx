'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-ieee-black relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ieee-blue/10 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-ieee-orange/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="z-10 text-center flex flex-col items-center space-y-8 p-8 backdrop-blur-sm bg-white/60 rounded-3xl border border-ieee-gray/20 shadow-xl max-w-2xl w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* AI Eye / Core */}
          <div className="w-32 h-32 rounded-full bg-white border-4 border-ieee-cyan/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,181,226,0.3)] relative overflow-hidden">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-16 h-16 rounded-full bg-ieee-cyan blur-md absolute"
            />
            <div className="w-8 h-8 rounded-full bg-white z-10 shadow-[0_0_20px_rgba(0,98,155,0.4)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-7xl font-bold font-heading tracking-tighter bg-gradient-to-r from-ieee-blue to-ieee-cyan bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-medium text-ieee-black">
            Neural Link Severed
          </h2>
          <p className="text-ieee-gray max-w-md mx-auto text-sm leading-relaxed">
            The coordinates you requested do not exist in our current cognitive matrix. 
            The AI core suggests recalibrating your navigation parameters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 bg-ieee-orange rounded-full hover:bg-ieee-orange/90 hover:shadow-[0_0_20px_rgba(255,163,0,0.4)] focus:outline-none focus:ring-2 focus:ring-ieee-orange focus:ring-offset-2 focus:ring-offset-white relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Core
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-ieee-orange to-ieee-orange/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
