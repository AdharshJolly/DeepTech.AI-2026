"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { event as gaEvent } from "@/lib/analytics";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { name: "About", href: "/#about" },
  { name: "Speakers", href: "/speakers" },
  { name: "Agenda", href: "/agenda" },
  { name: "Committee", href: "/committee" },
  { name: "Partners", href: "/#partners" },
  { name: "Past Events", href: "/past-events" },
  { name: "Social Hub", href: "/social-hub" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const isHomepage = pathname === "/";
  const activeScrolled = isScrolled || !isHomepage;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !isScrolled) setIsScrolled(true);
    else if (latest <= 20 && isScrolled) setIsScrolled(false);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    gaEvent({ action: "menu_toggle", category: "Navigation", label: isOpen ? "close" : "open" });
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center"
      initial={{ paddingTop: "0rem" }}
      animate={{ paddingTop: activeScrolled ? "1rem" : "0rem" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      <motion.nav
        className={`pointer-events-auto relative transition-colors duration-300 ${
          activeScrolled
            ? "backdrop-blur-xl border border-white/50 max-md:bg-white max-md:border-ieee-gray/10 max-md:shadow-lg md:bg-white/60 md:border-white/50"
            : "bg-transparent border-transparent"
        }`}
        initial={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: "0px",
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
        }}
        animate={{
          width: activeScrolled ? "95%" : "100%",
          maxWidth: activeScrolled ? "1280px" : "100%",
          borderRadius: activeScrolled ? "9999px" : "0px",
          boxShadow: activeScrolled
            ? "0 8px 30px rgba(0,0,0,0.12)"
            : "0 0px 0px rgba(0,0,0,0)",
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
                DeepTech<span className="text-ieee-orange">.AI</span>
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
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="text-ieee-gray hover:text-ieee-blue focus:outline-none bg-ieee-gray/5 p-2.5 rounded-full active:bg-ieee-gray/10 transition-colors"
              >
                {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </motion.div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          isScrolled={isScrolled}
          navLinks={navLinks}
          onClose={() => setIsOpen(false)}
        />
      </motion.nav>
    </motion.div>
  );
}
