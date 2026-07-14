import {
  Cpu,
  Factory,
  Microchip,
  Users,
  Globe2,
  Lightbulb,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Decorative blurred background elements for the glassmorphism to pop against */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-ieee-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-ieee-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 inline-flex items-center px-4 py-2 bg-ieee-orange/10 rounded-full border border-ieee-orange/20">
            <Zap className="w-4 h-4 mr-2" /> The Future is Physical
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-ieee-black tracking-tight mt-4">
            About The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-blue to-ieee-cyan">
              Summit
            </span>
          </h3>
        </div>

        {/* BENTO BOX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto gap-6">
          {/* Box 1: Hero About (Spans 2x2) */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-white/60 backdrop-blur-xl border border-white/50 p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
              <Globe2 className="w-32 h-32 text-ieee-blue" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-heading font-bold text-ieee-black mb-6 leading-tight relative z-10">
              Bridging the gap between digital intelligence and physical
              systems.
            </h3>
            <p className="text-ieee-gray leading-relaxed mb-8 relative z-10 text-lg">
              DeepTech.ai 2026 is the flagship IEEE Computer Society event
              bringing together leaders from across the ecosystem to explore how
              Artificial Intelligence is transforming robotics, hardware, and
              industrial automation.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-ieee-gray/20 relative z-10">
              <div className="flex items-center text-ieee-black font-semibold bg-white/50 px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-ieee-cyan mr-2" />
                Industry Leaders
              </div>
              <div className="flex items-center text-ieee-black font-semibold bg-white/50 px-4 py-2 rounded-full shadow-sm">
                <Globe2 className="w-5 h-5 text-ieee-cyan mr-2" />
                Global Researchers
              </div>
            </div>
          </div>

          {/* Box 2: Why Physical AI (Spans 2x1) */}
          <div className="md:col-span-2 lg:col-span-2 bg-ieee-black text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-ieee-cyan/20 rounded-full blur-3xl group-hover:bg-ieee-cyan/30 transition-all duration-500"></div>
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4 relative z-10">
              The next frontier is tangible.
            </h3>
            <p className="text-gray-300 leading-relaxed relative z-10">
              While generative AI has reshaped the digital landscape, the most
              profound transformations over the next decade will occur where AI
              intersects with the physical world, demanding rigorous engineering
              and cross-disciplinary innovation.
            </p>
          </div>

          {/* Box 3: Robotics (Spans 1x1) */}
          <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-ieee-orange/10 to-transparent p-8 rounded-[2.5rem] border border-ieee-orange/20 shadow-lg group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-ieee-orange/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <Cpu className="w-7 h-7 text-ieee-orange" />
            </div>
            <h4 className="text-xl font-bold font-heading text-ieee-black mb-3">
              Robotics & Automation
            </h4>
            <p className="text-ieee-gray text-sm leading-relaxed">
              Deep dive into next-gen control systems and autonomous robotics.
            </p>
          </div>

          {/* Box 4: Hardware (Spans 1x1) */}
          <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-ieee-cyan/10 to-transparent p-8 rounded-[2.5rem] border border-ieee-cyan/20 shadow-lg group hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-ieee-cyan/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
              <Microchip className="w-7 h-7 text-ieee-cyan" />
            </div>
            <h4 className="text-xl font-bold font-heading text-ieee-black mb-3">
              Hardware Intelligence
            </h4>
            <p className="text-ieee-gray text-sm leading-relaxed">
              Exploring edge AI, custom silicon, and embedded machine learning.
            </p>
          </div>

          {/* Box 5: Industrial (Spans 2x1) */}
          <div className="md:col-span-3 lg:col-span-2 bg-linear-to-br from-ieee-blue/10 to-transparent p-8 rounded-[2.5rem] border border-ieee-blue/20 shadow-lg group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-center">
            <div className="flex items-start">
              <div className="w-14 h-14 bg-ieee-blue/20 rounded-2xl flex items-center justify-center mr-6 shrink-0 group-hover:rotate-12 transition-transform duration-300">
                <Factory className="w-7 h-7 text-ieee-blue" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-heading text-ieee-black mb-2">
                  Industrial Applications
                </h4>
                <p className="text-ieee-gray text-sm leading-relaxed">
                  Scaling physical AI across manufacturing, supply chain,
                  autonomous vehicles, and precision healthcare.
                </p>
              </div>
            </div>
          </div>

          {/* Box 6: Innovation Alley (Spans full width) */}
          <div className="md:col-span-3 lg:col-span-4 bg-white/70 backdrop-blur-xl border border-white/50 p-6 md:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between group cursor-pointer hover:bg-white/80 transition-colors duration-300">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-ieee-orange rounded-full flex items-center justify-center mr-6 shrink-0 shadow-lg shadow-ieee-orange/30 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-ieee-black">
                  Innovation Alley
                </h4>
                <p className="text-ieee-gray text-sm">
                  Discover the most disruptive startups in the Physical AI
                  space.
                </p>
              </div>
            </div>
            <div className="flex items-center text-ieee-blue font-bold text-sm uppercase tracking-wider group-hover:text-ieee-orange transition-colors">
              Explore Startups{" "}
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
