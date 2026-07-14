"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

export default function SponsorMarquee() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          setPartners(data);
        } else {
          setPartners([
            { id: "1", name: "IEEE", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" },
            { id: "2", name: "DeepMind", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Google_DeepMind_Logo.svg" },
            { id: "3", name: "NVIDIA", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
            { id: "4", name: "MIT", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" },
            { id: "5", name: "OpenAI", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
          ]);
        }
      } catch (error) {
        setPartners([
          { id: "1", name: "IEEE", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" },
          { id: "2", name: "DeepMind", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Google_DeepMind_Logo.svg" },
          { id: "3", name: "NVIDIA", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
          { id: "4", name: "MIT", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg" },
          { id: "5", name: "OpenAI", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        ]);
      }
    };

    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-ieee-gray/5 py-12 relative flex">
      <div className="flex w-max animate-marquee space-x-16 px-8">
        {[...partners, ...partners, ...partners].map((partner, i) => (
          <div key={`${partner.id}-${i}`} className="flex items-center justify-center w-40 h-20 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <Image src={partner.logoUrl} alt={partner.name} width={160} height={80} className="object-contain max-h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
