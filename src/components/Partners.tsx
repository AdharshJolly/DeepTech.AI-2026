import Image from "next/image";
import { Hexagon } from "lucide-react";

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-24 bg-transparent relative z-10 border-t border-ieee-gray/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-blue uppercase mb-4 border border-ieee-blue/30 bg-ieee-blue/5 px-4 py-2 rounded-full">
            Supported By
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Our Partners
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Collaborating with the world's most innovative organizations to
            drive the future of Physical AI and robotics.
          </p>
        </div>

        {/* Organizers & Venue Partners */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-24 max-w-4xl mx-auto">
          {/* Organizer */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-widest text-ieee-gray/50 uppercase mb-6">
              Organized By
            </span>
            <div className="bg-white p-8 rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 w-72 h-36 flex items-center justify-center">
              <Image
                src="/images/ieee_cs_bc.png"
                alt="IEEE Computer Society Bangalore Chapter"
                width={200}
                height={80}
                className="w-full h-auto object-contain" priority />
            </div>
          </div>

          {/* Venue */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-widest text-ieee-gray/50 uppercase mb-6">
              Venue Partner
            </span>
            <div className="bg-white p-8 rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 w-72 h-36 flex items-center justify-center">
              <Image
                src="/images/GE_Healthcare.png"
                alt="GE Healthcare"
                width={200}
                height={80}
                className="w-full h-auto object-contain" priority />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-12 bg-ieee-gray/20"></div>
          <h3 className="text-xs font-bold tracking-widest text-ieee-gray/40 uppercase">
            Industry Partners
          </h3>
          <div className="h-px w-12 bg-ieee-gray/20"></div>
        </div>

        {/* General Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="group relative bg-white p-8 rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center min-h-40 hover:-translate-y-1"
            >
              <Hexagon className="w-10 h-10 text-ieee-gray/20 group-hover:text-ieee-blue transition-colors duration-500 mb-3" />
              <span className="text-xs font-bold text-ieee-gray/40 uppercase tracking-widest group-hover:text-ieee-blue/80 transition-colors">
                TBA
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

