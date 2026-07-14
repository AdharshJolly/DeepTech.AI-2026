import Image from "next/image";
import { Globe, MessageCircle, ArrowUpRight } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Speaker from "@/models/Speaker";

interface SpeakerItem {
  _id: unknown;
  name: string;
  role: string;
  company: string;
  bio?: string;
  order?: number;
  imageUrl?: string;
  isFeatured?: boolean;
}

export default async function Speakers() {
  await connectToDatabase();
  const speakers = (await Speaker.find()
    .sort({ order: 1 })
    .lean()) as SpeakerItem[];

  return (
    <section
      id="speakers"
      className="py-16 md:py-24 bg-transparent relative z-10 min-h-screen"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-ieee-blue/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-0 w-150 h-150 bg-ieee-cyan/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="inline-flex items-center text-sm font-bold tracking-[0.2em] text-ieee-orange uppercase mb-6 border border-ieee-orange/30 bg-ieee-orange/5 px-6 py-2 rounded-full shadow-lg">
            Plenary Sessions & Technical Keynotes
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-ieee-black tracking-tighter mt-4">
            Distinguished{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
              Speakers
            </span>
          </h2>
          <p className="text-lg md:text-xl text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
            Hear from the pioneers of physical AI, edge computing, and robotics
            who are redefining the boundaries of hardware and software.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-100 gap-6 md:gap-8">
          {speakers.map((speaker: SpeakerItem, idx: number) => {
            // 1st item: Huge (2x2) if featured
            // The rest are 1x1 or 2x1. We'll make every 4th item span 2 cols to keep it asymmetrical if it's not featured, but for now let's just respect the featured flag.
            const isFeatured = !!speaker.isFeatured;
            const isWide = !isFeatured && idx > 0 && idx % 5 === 0;

            const gridClass = isFeatured
              ? "sm:col-span-2 lg:col-span-2 row-span-2"
              : isWide
                ? "sm:col-span-2 lg:col-span-2 row-span-1"
                : "col-span-1 row-span-1";

            return (
              <div
                key={String(speaker._id)}
                className={`group relative w-full h-full rounded-[2.5rem] overflow-hidden bg-ieee-black shadow-2xl hover:shadow-[0_20px_50px_rgba(0,181,226,0.2)] transition-all duration-700 ${gridClass}`}
              >
                {/* Background Image */}
                {speaker.imageUrl ? (
                  <Image
                    src={speaker.imageUrl}
                    alt={speaker.role}
                    fill
                    className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-ieee-gray/20 to-ieee-black flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-ieee-gray/20 border-dashed animate-[spin_30s_linear_infinite]"></div>
                    <span className="absolute text-ieee-gray/40 uppercase tracking-widest text-xs font-bold text-center px-4">
                      {speaker.name}
                    </span>
                  </div>
                )}

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

                {/* Cyber-Corner Tech Accents */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-ieee-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-ieee-orange opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>

                {/* Glassmorphic Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
                    {/* Glowing highlight in the glass panel */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-ieee-blue/30 blur-2xl rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="mb-3">
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white bg-ieee-orange border border-ieee-orange px-3 py-1 rounded-full uppercase shadow-lg">
                          {speaker.company}
                        </span>
                      </div>

                      <h3
                        className={`${isFeatured ? "text-3xl md:text-4xl" : "text-2xl"} font-heading font-black text-white mb-1 leading-tight`}
                      >
                        {speaker.name}
                      </h3>

                      <p className="text-ieee-cyan font-semibold text-sm md:text-base">
                        {speaker.role}
                      </p>

                      {/* Hidden Social Links / Action */}
                      <div className="flex items-center gap-3 mt-4 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-6 transition-all duration-500 border-t border-white/10 pt-0 group-hover:pt-4 overflow-hidden">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors border border-white/10 cursor-pointer">
                          <Globe className="w-3.5 h-3.5 text-white" />
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center transition-colors border border-white/10 cursor-pointer">
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                        </button>
                        <div className="ml-auto flex items-center text-[10px] md:text-xs font-bold tracking-widest text-white uppercase hover:text-ieee-cyan cursor-pointer transition-colors">
                          View Bio <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
