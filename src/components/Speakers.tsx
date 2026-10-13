import Image from "next/image";
import { ChevronDown } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Speaker from "@/models/Speaker";

interface SpeakerItem {
  _id: unknown;
  name: string;
  role: string;
  company: string;
  bio?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  linkedinUrl?: string;
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.14v5.41h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54v4.88h-4z" />
    </svg>
  );
}

function Photo({ s, sizes }: { s: SpeakerItem; sizes: string }) {
  return s.imageUrl ? (
    <Image
      src={s.imageUrl}
      alt={s.name}
      fill
      sizes={sizes}
      unoptimized
      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-ieee-cyan/20 to-ieee-blue/20 text-5xl font-heading font-black text-ieee-blue/40">
      {s.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")}
    </div>
  );
}

const linkBtn =
  "w-10 h-10 rounded-xl border border-ieee-gray/20 flex items-center justify-center text-ieee-blue hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors";

function safeLinkedInUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && /(^|\.)linkedin\.com$/i.test(u.hostname)
      ? u.href
      : null;
  } catch {
    return null;
  }
}

function LinkedInLink({ s }: { s: SpeakerItem }) {
  const href = safeLinkedInUrl(s.linkedinUrl);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${s.name} on LinkedIn`}
      className={linkBtn}
    >
      <LinkedInIcon className="w-5 h-5" />
    </a>
  );
}

export default async function Speakers() {
  await connectToDatabase();
  const all = (await Speaker.find().sort({ order: 1 }).lean()) as SpeakerItem[];
  const featured = all.filter((s) => s.isFeatured);
  const rest = all.filter((s) => !s.isFeatured);

  return (
    <section className="py-8 md:py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="inline-flex items-center text-sm font-bold tracking-[0.2em] text-ieee-orange uppercase mb-6 border border-ieee-orange/30 bg-ieee-orange/5 px-6 py-2 rounded-full shadow-lg">
            Plenary Sessions & Technical Keynotes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-ieee-black tracking-tighter mt-4">
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

        {featured.map((s) => (
          <article
            key={String(s._id)}
            className="group grid md:grid-cols-5 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl overflow-hidden mb-8"
          >
            <div className="relative md:col-span-2 aspect-4/5 md:aspect-auto md:min-h-[26rem] overflow-hidden">
              <Photo s={s} sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
            <div className="md:col-span-3 p-6 md:p-10 flex flex-col gap-3 justify-center">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-ieee-orange">
                Featured Speaker
              </span>
              <h3 className="text-3xl md:text-5xl font-heading font-black text-ieee-black tracking-tight leading-tight">
                {s.name}
              </h3>
              <p className="text-ieee-blue font-semibold text-lg">{s.role}</p>
              <span className="self-start text-xs font-bold tracking-widest text-white bg-ieee-orange px-3 py-1 rounded-full uppercase">
                {s.company}
              </span>
              {s.bio && (
                <p className="text-ieee-gray leading-relaxed max-w-prose mt-2 whitespace-pre-line">
                  {s.bio}
                </p>
              )}
              {safeLinkedInUrl(s.linkedinUrl) && (
                <div className="flex gap-3 mt-4">
                  <LinkedInLink s={s} />
                </div>
              )}
            </div>
          </article>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {rest.map((s) => (
            <article
              key={String(s._id)}
              className="group bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-lg hover:shadow-[0_20px_50px_rgba(0,98,155,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                <Photo s={s} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-5 flex flex-col gap-1.5">
                <span className="self-start text-[11px] font-bold tracking-widest text-white bg-ieee-orange px-3 py-1 rounded-full uppercase">
                  {s.company}
                </span>
                <h3 className="text-xl font-heading font-bold text-ieee-black mt-2 leading-tight">
                  {s.name}
                </h3>
                <p className="text-ieee-blue font-semibold text-sm">{s.role}</p>
                {(s.bio || safeLinkedInUrl(s.linkedinUrl)) && (
                  <div className="relative mt-3">
                    {s.bio ? (
                      <details className="group/bio">
                        <summary className="list-none cursor-pointer w-fit flex items-center gap-1.5 text-sm font-bold text-ieee-black border border-ieee-gray/20 rounded-xl px-4 h-10 hover:border-ieee-blue hover:text-ieee-blue transition-colors [&::-webkit-details-marker]:hidden">
                          Read bio
                          <ChevronDown className="w-4 h-4 transition-transform group-open/bio:rotate-180" />
                        </summary>
                        <p className="text-sm text-ieee-gray leading-relaxed mt-4 pt-4 border-t border-ieee-gray/15 whitespace-pre-line">
                          {s.bio}
                        </p>
                      </details>
                    ) : null}
                    {safeLinkedInUrl(s.linkedinUrl) && (
                      <div className={s.bio ? "absolute right-0 top-0" : ""}>
                        <LinkedInLink s={s} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
