import { MapPin, Mail, Phone, ChevronRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-24 bg-transparent relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Location & Contact
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Have questions about the summit, registration, or sponsorship
            opportunities? Our organizing committee is here to assist you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left: Contact Info Cards */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            {/* Location Card */}
            <div className="bg-white p-8 rounded-3xl border border-ieee-gray/10 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ieee-cyan/5 rounded-full blur-3xl group-hover:bg-ieee-cyan/15 transition-colors duration-500"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-ieee-cyan/10 border border-ieee-cyan/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-ieee-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ieee-black mb-2">
                    Summit Venue
                  </h3>
                  <p className="text-ieee-gray leading-relaxed mb-4">
                    GE Healthcare JFWTC
                    <br />
                    Whitefield, Bengaluru
                    <br />
                    Karnataka 560066, India
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-cyan uppercase hover:text-ieee-orange transition-colors"
                  >
                    Get Directions <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-3xl border border-ieee-gray/10 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ieee-orange/5 rounded-full blur-3xl group-hover:bg-ieee-orange/15 transition-colors duration-500"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-ieee-orange/10 border border-ieee-orange/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-ieee-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ieee-black mb-2">
                    Email Inquiries
                  </h3>
                  <p className="text-ieee-gray leading-relaxed">
                    hello@deeptech2026.ieee.org
                  </p>
                  <p className="text-sm text-ieee-gray/60 mt-1">
                    We aim to reply within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-3xl border border-ieee-gray/10 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ieee-blue/5 rounded-full blur-3xl group-hover:bg-ieee-blue/15 transition-colors duration-500"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-ieee-blue/10 border border-ieee-blue/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-ieee-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ieee-black mb-2">
                    Direct Phone
                  </h3>
                  <p className="text-ieee-gray leading-relaxed">
                    +91 800 123 4567
                  </p>
                  <p className="text-sm text-ieee-gray/60 mt-1">
                    Mon-Fri from 9am to 6pm IST.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map Embed */}
          <div className="w-full lg:w-7/12 relative flex">
            <div className="bg-white p-4 rounded-[2.5rem] border border-ieee-gray/10 shadow-2xl relative overflow-hidden w-full h-full min-h-112.5">
              {/* Tech Accent Background */}
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-ieee-cyan/10 rounded-full blur-[80px]"></div>
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-ieee-orange/10 rounded-full blur-[80px]"></div>

              <div className="relative z-10 w-full h-full rounded-4xl overflow-hidden shadow-inner bg-ieee-gray/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.914836591106!2d77.72128397455987!3d12.977303814767291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11f4e9762799%3A0xc6fb11df29ea4c7a!2sGE%20Healthcare!5e0!3m2!1sen!2sin!4v1783961758146!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
