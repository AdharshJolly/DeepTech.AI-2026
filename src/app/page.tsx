import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Countdown from '@/components/Countdown';
import PreviewCards from '@/components/PreviewCards';
import InnovationAlley from '@/components/InnovationAlley';
import Partners from '@/components/Partners';
import RegistrationCTA from '@/components/RegistrationCTA';
import ScrollReveal from '@/components/ScrollReveal';
import SponsorMarquee from '@/components/SponsorMarquee';
import EventBanner from '@/components/EventBanner';
import connectToDatabase from '@/lib/db';
import Partner from '@/models/Partner';

const permanentPartners = [
  { id: "1", name: "IEEE", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg" },
  { id: "2", name: "IEEE Computer Society", logoUrl: "/images/ieee_cs_bc.png" },
  { id: "3", name: "GE Healthcare", logoUrl: "/images/GE_Healthcare.png" },
  { id: "4", name: "IEEE CS 80th Anniversary", logoUrl: "/images/IEEE-CS-80th-icon.png" },
];

async function getPartners() {
  try {
    await connectToDatabase();
    const dbPartners = await Partner.find().sort({ order: 1 }).lean();
    const mapped = dbPartners.map(p => ({ id: p._id.toString(), name: p.name, logoUrl: p.logoUrl }));
    return [...permanentPartners, ...mapped];
  } catch {
    return permanentPartners;
  }
}

export default async function Home() {
  const partners = await getPartners();

  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      <ScrollReveal>
        <SponsorMarquee partners={partners} />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <EventBanner />
      <ScrollReveal>
        <Countdown />
      </ScrollReveal>
      <ScrollReveal>
        <PreviewCards />
      </ScrollReveal>
      <ScrollReveal>
        <InnovationAlley />
      </ScrollReveal>
      <ScrollReveal>
        <Partners />
      </ScrollReveal>
      <ScrollReveal>
        <RegistrationCTA />
      </ScrollReveal>
    </main>
  );
}
