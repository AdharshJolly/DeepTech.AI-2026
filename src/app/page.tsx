import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import About from '@/components/About';
import Partners from '@/components/Partners';
import RegistrationCTA from '@/components/RegistrationCTA';
import InnovationAlley from '@/components/InnovationAlley';
import ScrollReveal from '@/components/ScrollReveal';


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
        <section className="py-24 bg-transparent border-y border-ieee-gray/20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-12 border border-ieee-gray/10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow group">
                <h3 className="text-3xl font-heading font-black text-ieee-black mb-4">Distinguished Speakers</h3>
                <p className="text-ieee-gray mb-8 leading-relaxed">
                  Meet the industry leaders, researchers, and pioneers who are building the next generation of Physical AI and robotics.
                </p>
                <Link href="/speakers" className="inline-flex items-center text-ieee-blue font-bold tracking-widest uppercase text-sm group-hover:text-ieee-orange transition-colors">
                  View All Speakers
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-white p-12 border border-ieee-gray/10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow group">
                <h3 className="text-3xl font-heading font-black text-ieee-black mb-4">Conference Agenda</h3>
                <p className="text-ieee-gray mb-8 leading-relaxed">
                  Explore our comprehensive schedule of keynotes, technical deep-dives, and hands-on workshops happening across the summit.
                </p>
                <Link href="/agenda" className="inline-flex items-center text-ieee-blue font-bold tracking-widest uppercase text-sm group-hover:text-ieee-orange transition-colors">
                  View Full Agenda
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 8. Innovation Alley */}
      <ScrollReveal>
        <InnovationAlley />
      </ScrollReveal>
      

      {/* 9. Partners */}
      <ScrollReveal>
        <Partners />
      </ScrollReveal>
      
      {/* 10. Registration CTA */}
      <ScrollReveal>
        <RegistrationCTA />
      </ScrollReveal>
      
    </main>
  );
}
