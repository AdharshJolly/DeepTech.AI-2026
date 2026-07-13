"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Physical AI', href: '#physical-ai' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Agenda', href: '#agenda' },
    { name: 'Innovation Alley', href: '#innovation-alley' },
    { name: 'Venue', href: '#venue' },
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-ieee-white/90 backdrop-blur-md shadow-sm border-b border-ieee-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-heading font-bold text-2xl text-ieee-blue tracking-tight">
              DeepTech<span className="text-ieee-orange">.ai</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-ieee-gray hover:text-ieee-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-ieee-orange text-ieee-white px-6 py-2 rounded-sm font-semibold hover:bg-ieee-orange/90 transition-colors text-sm uppercase tracking-wide cursor-not-allowed opacity-80" disabled>
              Register (Closed)
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ieee-gray hover:text-ieee-blue focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-ieee-white border-t border-ieee-gray/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-ieee-gray hover:text-ieee-blue hover:bg-ieee-gray/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <button className="w-full bg-ieee-orange text-ieee-white px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wide cursor-not-allowed opacity-80" disabled>
                Register (Closed)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
