import React from 'react';
import { Hexagon, Cpu, Network, Zap } from 'lucide-react';

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-transparent relative z-10 border-t border-ieee-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-blue uppercase mb-4 border border-ieee-blue/30 bg-ieee-blue/5 px-4 py-2 rounded-full">
            Supported By
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Our Partners
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Collaborating with the world's most innovative organizations to drive the future of Physical AI and robotics.
          </p>
        </div>

        {/* General Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="group relative bg-white p-8 rounded-[2rem] border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center min-h-[160px] hover:-translate-y-1">
              <Hexagon className="w-10 h-10 text-ieee-gray/20 group-hover:text-ieee-blue transition-colors duration-500 mb-3" />
              <span className="text-xs font-bold text-ieee-gray/40 uppercase tracking-widest group-hover:text-ieee-blue/80 transition-colors">TBA</span>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
