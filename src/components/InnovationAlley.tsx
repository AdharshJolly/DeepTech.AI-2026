import { Cpu, Bot, Zap, Rocket } from "lucide-react";

export default function InnovationAlley() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-ieee-cyan" />,
      title: "Robotics Showcases",
      description:
        "Get hands-on with the latest autonomous medical bots and industrial robotic arms bridging the physical-digital divide.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-ieee-blue" />,
      title: "Hardware & Edge AI",
      description:
        "Explore custom silicon and edge-computing devices designed specifically for zero-latency medical imaging and AI inference.",
    },
    {
      icon: <Zap className="w-8 h-8 text-ieee-orange" />,
      title: "Live Demonstrations",
      description:
        "Witness synthetic data simulations and real-time physical AI operations happening live on the exhibition floor.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-ieee-gray" />,
      title: "Startup Pitches",
      description:
        "Hear from founders building the next generation of physical intelligence during rapid 5-minute lightning talks.",
    },
  ];

  return (
    <section id="innovation-alley" className="py-24 relative z-10">
      <div className="absolute inset-0 bg-ieee-black/5 -skew-y-2 transform origin-top-left z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-cyan uppercase mb-4 border border-ieee-cyan/30 bg-ieee-cyan/5 px-4 py-2 rounded-full">
            The Exhibition Space
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4 mb-6">
            Innovation Alley
          </h2>
          <p className="text-lg md:text-xl text-ieee-gray max-w-3xl mx-auto leading-relaxed">
            Where code meets machinery. Innovation Alley is the dedicated
            physical hub of DeepTech.ai where theoretical models are brought to
            life through interactive hardware, startup showcases, and live
            demonstrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-10 rounded-4xl border border-ieee-gray/10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="bg-ieee-gray/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-ieee-black mb-4">
                {feature.title}
              </h3>
              <p className="text-ieee-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
