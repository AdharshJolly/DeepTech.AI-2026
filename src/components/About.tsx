import {
  Cpu,
  Factory,
  Microchip,
  Users,
  Globe2,
  Lightbulb,
} from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Cpu className="w-6 h-6 text-ieee-orange" />,
      title: "Robotics & Automation",
      description:
        "Deep dive into next-gen control systems and autonomous robotics.",
    },
    {
      icon: <Microchip className="w-6 h-6 text-ieee-cyan" />,
      title: "Hardware Intelligence",
      description:
        "Exploring edge AI, custom silicon, and embedded machine learning.",
    },
    {
      icon: <Factory className="w-6 h-6 text-ieee-blue" />,
      title: "Industrial Applications",
      description:
        "Scaling physical AI across manufacturing, supply chain, and healthcare.",
    },
  ];

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About & Why Physical AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-ieee-orange uppercase mb-3">
              About the Event
            </h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-ieee-black mb-6 leading-tight">
              Bridging the gap between{" "}
              <span className="text-ieee-blue">digital intelligence</span> and{" "}
              <span className="text-ieee-blue">physical systems</span>.
            </h3>
            <p className="text-ieee-gray leading-relaxed mb-6">
              DeepTech.ai 2026 is the flagship IEEE Computer Society event
              bringing together leaders from across the ecosystem. We aim to
              explore how Artificial Intelligence is transforming robotics,
              hardware, and industrial automation.
            </p>
            <div className="flex items-center space-x-6 pt-4 border-t border-ieee-gray/20">
              <div className="flex items-center text-ieee-black font-medium">
                <Users className="w-5 h-5 text-ieee-cyan mr-2" />
                Industry Leaders
              </div>
              <div className="flex items-center text-ieee-black font-medium">
                <Globe2 className="w-5 h-5 text-ieee-cyan mr-2" />
                Global Researchers
              </div>
            </div>
          </div>

          <div className="bg-ieee-gray/5 p-8 md:p-12 border border-ieee-gray/10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-ieee-cyan/10 rounded-full blur-2xl"></div>
            <h2 className="text-sm font-bold tracking-widest text-ieee-orange uppercase mb-3">
              Why Physical AI?
            </h2>
            <h3 className="text-2xl font-heading font-bold text-ieee-black mb-4">
              The next frontier is tangible.
            </h3>
            <p className="text-ieee-gray leading-relaxed">
              While generative AI has reshaped the digital landscape, the most
              profound transformations over the next decade will occur where AI
              intersects with the physical world.
            </p>
            <br />
            <p className="text-ieee-gray leading-relaxed">
              From automated manufacturing to autonomous healthcare devices,
              Physical AI demands rigorous engineering, safety standards, and
              cross-disciplinary innovation.
            </p>
          </div>
        </div>

        {/* Event Highlights */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-ieee-orange uppercase mb-3">
              Event Highlights
            </h2>
            <h3 className="text-3xl font-heading font-bold text-ieee-black">
              Core Themes
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group p-8 border border-ieee-gray/10 rounded-3xl shadow-lg hover:border-ieee-cyan/50 hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="w-12 h-12 bg-ieee-gray/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold font-heading text-ieee-black mb-3">
                  {item.title}
                </h4>
                <p className="text-ieee-gray text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-ieee-gray/5 px-6 py-3 rounded-full border border-ieee-gray/10">
              <Lightbulb className="w-5 h-5 text-ieee-orange" />
              <span className="text-sm text-ieee-black font-medium">
                Also featuring a dedicated <strong>Innovation Alley</strong> for
                startup showcases.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
