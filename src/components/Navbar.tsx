"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !isScrolled) setIsScrolled(true);
    else if (latest <= 20 && isScrolled) setIsScrolled(false);
  });

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Speakers", href: "/speakers" },
    { name: "Agenda", href: "/agenda" },
    { name: "Committee", href: "/committee" },
    { name: "Partners", href: "/#partners" },
    { name: "Past Events", href: "/past-events" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center"
      initial={{ paddingTop: "0rem" }}
      animate={{ paddingTop: isScrolled ? "1rem" : "0rem" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      <motion.nav
        className="pointer-events-auto relative backdrop-blur-xl bg-white/60 border border-white/50"
        initial={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: "0px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        animate={{
          width: isScrolled ? "95%" : "100%",
          maxWidth: isScrolled ? "1280px" : "100%",
          borderRadius: isScrolled ? "9999px" : "0px",
          boxShadow: isScrolled
            ? "0 8px 30px rgba(0,0,0,0.12)"
            : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        <div className="mx-auto px-4 sm:px-8 lg:px-10">
          <motion.div
            className="flex justify-between items-center"
            initial={{ height: "5rem" }}
            animate={{ height: isScrolled ? "4.5rem" : "5rem" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                aria-label="Home"
                className="font-heading font-bold text-2xl text-ieee-blue tracking-tight"
              >
                DeepTech<span className="text-ieee-orange">.ai</span>
              </Link>
            </div>

            <div className="hidden lg:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-ieee-gray hover:text-ieee-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <motion.button
                aria-label="Registrations Coming Soon"
                className="bg-ieee-orange text-ieee-white rounded-full font-bold hover:bg-ieee-orange/90 transition-colors uppercase tracking-wide cursor-not-allowed opacity-80"
                initial={{ padding: "0.6rem 1.5rem", fontSize: "0.875rem" }}
                animate={{
                  padding: isScrolled ? "0.5rem 1.25rem" : "0.6rem 1.5rem",
                  fontSize: isScrolled ? "0.8rem" : "0.875rem",
                }}
                disabled
              >
                Registrations Coming Soon
              </motion.button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="text-ieee-gray hover:text-ieee-blue focus:outline-none bg-ieee-gray/5 p-2 rounded-full"
              >
                {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </motion.div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`md:hidden absolute w-full ${
              isScrolled
                ? "top-[110%] left-0 backdrop-blur-xl bg-white/60 border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.1)] overflow-hidden"
                : "top-full left-0 backdrop-blur-xl bg-white/60 border-t border-white/50 shadow-lg"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 rounded-2xl text-base font-medium text-ieee-black bg-ieee-gray/5 hover:text-ieee-blue hover:bg-ieee-cyan/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
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
        )}
      </motion.nav>
    </motion.div>
  );
}
