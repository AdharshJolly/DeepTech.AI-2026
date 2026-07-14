import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import About from '@/components/About';
import Partners from '@/components/Partners';
import RegistrationCTA from '@/components/RegistrationCTA';
import InnovationAlley from '@/components/InnovationAlley';
import ScrollReveal from '@/components/ScrollReveal';
import PreviewCards from '@/components/PreviewCards';

const SponsorMarquee = dynamic(() => import('@/components/SponsorMarquee'));

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen overflow-hidden">
      <Hero />
      <ScrollReveal>
        <SponsorMarquee />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Countdown />
      </ScrollReveal>
      
      {/* Previews for Speakers & Agenda */}
      <ScrollReveal>
        <PreviewCards />
      </ScrollReveal>

      {/* Innovation Alley */}
      <ScrollReveal>
        <InnovationAlley />
      </ScrollReveal>
      
      {/* Partners */}
      <ScrollReveal>
        <Partners />
      </ScrollReveal>
      
      {/* Registration CTA */}
      <ScrollReveal>
        <RegistrationCTA />
      </ScrollReveal>
      
    </main>
  );
}
