"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isScrolled: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

export default function MobileMenu({ isOpen, isScrolled, navLinks, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`md:hidden absolute w-full ${
        isScrolled
          ? "top-[110%] left-0 md:backdrop-blur-xl md:bg-white/60 md:border md:border-white/50 max-md:bg-white max-md:border max-md:border-ieee-gray/10 max-md:shadow-xl rounded-3xl overflow-hidden"
          : "top-full left-0 backdrop-blur-xl bg-white border-t border-ieee-gray/10 shadow-lg"
      }`}
    >
      <div className="px-4 pt-4 pb-6 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-4 py-3.5 rounded-2xl text-base font-medium text-ieee-black bg-ieee-gray/5 hover:text-ieee-blue hover:bg-ieee-cyan/10 transition-colors active:bg-ieee-cyan/15"
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        <div className="pt-3">
          <button
            aria-label="Registrations Coming Soon"
            className="w-full bg-ieee-orange text-ieee-white px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-not-allowed opacity-80 shadow-md"
            disabled
          >
            Registrations Coming Soon
          </button>
        </div>
      </div>
    </motion.div>
  );
}
