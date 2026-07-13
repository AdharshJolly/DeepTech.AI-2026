import React from 'react';
import Image from 'next/image';
import { Globe, MessageCircle, ArrowUpRight } from 'lucide-react';

const speakers = [
  {
    name: "Speaker — TBA",
    role: "Expert in Physical AI",
    org: "Organization — TBA",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBplpkhho3847hz38bUG2COLPndSNvSg8Hv7Q_I5KBaqat7KUkzSWyF0HrQ7HLWsrgW9RfA0V7JjDrmxgiHsyUJE730DCv-jcCFBHo3mGeE_PFHbhWYJ56U7fbAs2GJAWL4jqzMD8tRVHRypEB71f9yHYX14ghzehSVDahQ_tQimFsvDPgxHL40bhO3EmQV8ibUu3Gr58xDEovVRh5PqgEN76KCNd2Zb8pSdCYgPwrOO3D553rjqr0"
  },
  {
    name: "Speaker — TBA",
    role: "Expert in Medical Imaging",
    org: "Organization — TBA",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNiZqAlPygfa-zrykxVTEtVk8507CgYGXeWRNaYhNbSuEIpkLEUjPrbeesvIuCT9XsiVpAlmQMFZySCxiQBN2_O8q-ZpLOdCSu1swyil-KGRK_73sU5xQgXA5qXpERB7m0qdMws3tZw2DoXTMjyilgD9zc6988XiRLu6kHxe9Q6EvYUTSYxBk2e3JCFNzeOl2_sfq6CNI8mLV4VE4jLA7Cr3CbC8JrJgTJGzRXxIAVjzbfF6OdzFI"
  },
  {
    name: "Speaker — TBA",
    role: "Expert in Autonomous Systems",
    org: "Organization — TBA",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4k6bcki7azzVWDrUDgvzq2LLoF3quBrtD7llzhbCNp4YRQr0LuF-Jb2Ucukd-T-wzpBMcTqvTcG27XiJULf-GFEPSlAOt0J0rll6xPj9k3gFHTRjLywnXKwWiOzvJxyYvf-Dh2uT2A7Y4E8u30W-bNmOBgMpGzN6C7GrUsad1nMJiJ3UToz7XQ7BcVSAK7qqZn4U7l4y0dvL5KrpoeE_DDxFLJwQGO7dlX_sF4g9VnNRYhiB3szc"
  },
  {
    name: "Speaker — TBA",
    role: "Expert in Edge Hardware",
    org: "Organization — TBA",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlBkfp8PDbzwXV2G8u3p_D5FPb-d9troMetjoQSKhXfXHCorkxcdFeibXH9Eo_eNpeoLxWulU-wRbjP8Uu7maXwzJz3disy9B0qA5bMTW2lCYwu99NQ4evPRr3bqYPiEDH_nfYm_53tDzhkTjUvAI9ZvY4EBjH811q_k2-iUHw0SRsRRBnhQzAVhZ_ntC2zunjbmNGmcLSg1Eu_VvL9aKpFpRSwJtP8eIO7hKG6rD3kWLmmt_Wg9s"
  },
  {
    name: "Speaker — TBA",
    role: "Expert in Neuromorphic Chips",
    org: "Organization — TBA",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8DkgYzDJ0idtjo7yvrcsxVxSDZLgaQff5HznjVnrGK_enhzJBc-nTClDFHEahP4yJOnvjqOphiWAsMLA_oTnWNYLWJrAoQ41kC0deiWWXKRNbcua2ENLQuPCPVI9vH2QQPr13R7GIwcr_2xM3K69VPYLC8UseIuGBbVqiuvNWj42TC7JoU6a17WXc-N42wjmiwcyGxr2MfoenUioBW1W7ki7p-Lt7GksO1stT4xSObhkmg61YaCY"
  },
  {
    name: "Speaker — TBA",
    role: "Expert in Industrial Automation",
    org: "Organization — TBA",
    imgUrl: null // Placeholder for missing speaker
  }
];

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 bg-transparent relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            Plenary Sessions & Technical Keynotes
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Distinguished Speakers
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Hear from the pioneers of physical AI, edge computing, and robotics who are redefining the boundaries of hardware and software.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {speakers.map((speaker, index) => (
            <div key={index} className="group relative w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-ieee-black shadow-2xl hover:shadow-[0_20px_50px_rgba(0,181,226,0.15)] transition-all duration-500">
              
              {/* Background Image */}
              {speaker.imgUrl ? (
                <Image 
                  src={speaker.imgUrl} 
                  alt={speaker.role}
                  fill
                  className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-ieee-gray/10 to-ieee-black flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-ieee-gray/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
                  <span className="absolute text-ieee-gray/40 uppercase tracking-widest text-xs font-bold">To Be Announced</span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Hover Borders / Corners (Tech Aesthetic) */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-ieee-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-ieee-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Top Badge (Organization) */}
                  <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-xs font-bold tracking-widest text-ieee-orange bg-ieee-orange/10 border border-ieee-orange/30 px-3 py-1.5 rounded-full uppercase backdrop-blur-md">
                      {speaker.org}
                    </span>
                  </div>

                  <h3 className="text-3xl font-heading font-black text-white mb-2 leading-tight">
                    {speaker.name}
                  </h3>
                  
                  <p className="text-ieee-cyan font-semibold text-lg mb-6">
                    {speaker.role}
                  </p>
                  
                  {/* Hidden Social Links / Action */}
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 border-t border-white/10 pt-6">
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors border border-white/10">
                      <Globe className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors border border-white/10">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </button>
                    <div className="ml-auto flex items-center text-xs font-bold tracking-widest text-white uppercase hover:text-ieee-orange cursor-pointer transition-colors">
                      View Bio <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
