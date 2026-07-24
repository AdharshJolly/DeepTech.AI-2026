"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.15, ease: [0.55, 0.06, 0.68, 0.19] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 + i * 0.04,
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: 0.1 } },
};

export default function MobileMenu({ isOpen, isScrolled, navLinks, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`md:hidden absolute w-full ${
            isScrolled
              ? "top-[110%] left-0 md:backdrop-blur-xl md:bg-white/60 md:border md:border-white/50 max-md:bg-white max-md:border max-md:border-ieee-gray/10 max-md:shadow-xl rounded-3xl overflow-hidden"
              : "top-full left-0 backdrop-blur-xl bg-white border-t border-ieee-gray/10 shadow-lg"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-3.5 rounded-2xl text-base font-medium text-ieee-black bg-ieee-gray/5 hover:text-ieee-blue hover:bg-ieee-cyan/10 transition-colors active:bg-ieee-cyan/15"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={navLinks.length}
              className="pt-3"
            >
              <button
                aria-label="Registrations Coming Soon"
                className="w-full bg-ieee-orange text-ieee-white px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest cursor-not-allowed opacity-80 shadow-md"
                disabled
              >
                Registrations Coming Soon
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
