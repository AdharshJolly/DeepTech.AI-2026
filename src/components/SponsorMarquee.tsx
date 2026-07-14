"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

export default function SponsorMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fallbackPartners = [
      {
        id: "1",
        name: "IEEE",
        logoUrl:
          "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg",
      },
      {
        id: "2",
        name: "IEEE Computer Society",
        logoUrl: "/images/ieee_cs_bc.png",
      },
      { id: "3", name: "GE Healthcare", logoUrl: "/images/GE_Healthcare.png" },
      {
        id: "4",
        name: "IEEE CS 80th Anniversary",
        logoUrl: "/images/IEEE-CS-80th-icon.png",
      },
    ];

    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/admin/partners");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPartners(data);
          } else {
            setPartners(fallbackPartners);
          }
        } else {
          setPartners(fallbackPartners);
        }
      } catch {
        setPartners(fallbackPartners);
      }
    };

    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-ieee-gray/5 py-6 relative flex">
      <div className="flex w-max animate-marquee space-x-16 px-8">
        {[...partners, ...partners, ...partners, ...partners, ...partners].map(
          (partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex items-center justify-center h-14 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 shrink-0"
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
