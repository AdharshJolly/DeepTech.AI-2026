import { Ticket, Calendar, Zap } from "lucide-react";

export default function RegistrationCTA() {
  return (
    <section className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-ieee-black rounded-[3rem] overflow-hidden shadow-2xl p-10 md:p-20 text-center border border-white/10 group">
          {/* Tech Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-ieee-cyan/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-ieee-cyan/30 transition-colors duration-1000"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-ieee-orange/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-ieee-orange/20 transition-colors duration-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-ieee-blue/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-ieee-blue/20 transition-colors duration-1000"></div>

          {/* Grid Pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size[4rem_4rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
              <Ticket className="w-10 h-10 text-ieee-cyan" />
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight mb-6">
              Secure Your Spot <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-orange to-ieee-cyan">
                in the Future.
              </span>
            </h2>

            <p className="text-xl text-ieee-gray/80 max-w-2xl mx-auto leading-relaxed mb-12">
              Join 500+ leaders, innovators, and researchers in Bengaluru for
              three days of cutting-edge Physical AI exploration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                disabled
                className="group/btn relative inline-flex items-center justify-center px-10 py-5 font-bold text-ieee-black transition-all duration-300 bg-white rounded-full shadow-[0_0_40px_rgba(0,181,226,0.2)] uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Registrations Coming Soon
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-bold tracking-widest text-ieee-gray/60 uppercase">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-ieee-orange" />
                Nov 12-14, 2026
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-ieee-cyan" />
                Limited Seats Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
