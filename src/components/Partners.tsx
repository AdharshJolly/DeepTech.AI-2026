import Image from "next/image";
import Link from "next/link";
import { Hexagon, ArrowRight } from "lucide-react";

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-16 md:py-24 bg-transparent relative z-10 border-t border-ieee-gray/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-blue uppercase mb-4 border border-ieee-blue/30 bg-ieee-blue/5 px-4 py-2 rounded-full">
            Supported By
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Our Partners
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Collaborating with the world&apos;s most innovative organizations to
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
            <div className="bg-white p-5 md:p-8 rounded-3xl md:rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 w-full max-w-72 h-28 md:h-36 flex items-center justify-center">
              <Image
                src="/images/ieee_cs_bc.png"
                alt="IEEE Computer Society Bangalore Chapter"
                width={200}
                height={80}
                style={{ width: "100%", height: "auto" }}
                className="object-contain" priority />
            </div>
          </div>

          {/* Venue */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-widest text-ieee-gray/50 uppercase mb-6">
              Venue Partner
            </span>
            <div className="bg-white p-5 md:p-8 rounded-3xl md:rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 w-full max-w-72 h-28 md:h-36 flex items-center justify-center">
              <Image
                src="/images/GE_Healthcare.png"
                alt="GE Healthcare"
                width={200}
                height={80}
                style={{ width: "100%", height: "auto" }}
                className="object-contain" priority />
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
              className="group relative bg-white p-5 md:p-8 rounded-3xl md:rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center min-h-32 md:min-h-40 hover:-translate-y-1"
            >
              <Hexagon className="w-10 h-10 text-ieee-gray/20 group-hover:text-ieee-blue transition-colors duration-500 mb-3" />
              <span className="text-xs font-bold text-ieee-gray/40 uppercase tracking-widest group-hover:text-ieee-blue/80 transition-colors">
                TBA
              </span>
            </div>
          ))}
        </div>

        {/* Partner CTA Banner */}
        <div className="mt-20 bg-linear-to-r from-ieee-blue to-ieee-cyan rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size[2rem_2rem] pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-heading font-black mb-4">
              Interested in Partnering with Us?
            </h3>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Join us as a sponsor, technology partner, or community collaborator
              for DeepTech.AI 2026. Let&apos;s shape the future of Physical AI together.
            </p>
            <Link
              href="/partner-inquiry"
              className="inline-flex items-center gap-2 bg-white text-ieee-blue px-8 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:scale-105 transition-all"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

