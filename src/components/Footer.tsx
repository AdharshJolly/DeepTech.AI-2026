import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-ieee-black text-ieee-white py-10 md:py-12 border-t-4 border-ieee-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-heading font-bold text-2xl tracking-tight">
              DeepTech<span className="text-ieee-orange">.AI</span> 2026
            </h2>
            <p className="text-ieee-gray text-sm max-w-sm">
              The flagship IEEE Computer Society event exploring how Physical AI
              is transforming robotics, hardware, and industrial automation.
            </p>
            <div className="pt-4 flex flex-wrap gap-6 md:gap-8 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ieee_cs_bc.png"
                alt="IEEE CS BC Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/IEEE-CS-80th-icon.png"
                alt="IEEE CS 80th Anniversary Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/GE_Healthcare.png"
                alt="GE Healthcare Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-ieee-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-ieee-gray">
              <li>
                <Link
                  href="#about"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  About the Event
                </Link>
              </li>
              <li>
                <Link
                  href="#speakers"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="#agenda"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  Agenda
                </Link>
              </li>
              <li>
                <Link
                  href="#partners"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/past-events"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  Past Events
                </Link>
              </li>
              <li>
                <Link
                  href="/social-hub"
                  className="hover:text-ieee-cyan transition-colors"
                >
                  Social Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-ieee-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-ieee-gray mb-6">
              <li>Bengaluru, India</li>
              <li>GE Healthcare — JFWTC</li>
            </ul>
            <h4 className="font-heading font-semibold text-xs mb-3 text-ieee-white uppercase tracking-wider">
              Follow Us
            </h4>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ieee-gray/20 flex flex-col md:flex-row justify-between items-center text-xs text-ieee-gray">
          <p>
            &copy; {new Date().getFullYear()} IEEE Computer Society Bangalore
            Chapter. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="#" className="hover:text-ieee-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-ieee-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
