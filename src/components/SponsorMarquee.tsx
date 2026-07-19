"use client";

import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

interface SponsorMarqueeProps {
  partners: Partner[];
}

export default function SponsorMarquee({ partners }: SponsorMarqueeProps) {
  if (partners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-ieee-gray/5 py-4 md:py-6 relative flex">
      <div className="flex w-max animate-marquee space-x-12 md:space-x-16 px-6 md:px-8">
        {[...partners, ...partners, ...partners, ...partners, ...partners].map(
          (partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex items-center justify-center h-10 md:h-14 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-full w-auto object-contain"
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
