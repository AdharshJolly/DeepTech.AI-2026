import {
  Cpu,
  Network,
  CircuitBoard,
  Hexagon,
  Share2,
  Activity,
} from "lucide-react";

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-ieee-white">
      {/* Subtle Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#75787B_1.5px,transparent_1.5px)] bg-size-[40px_40px] opacity-[0.05]"></div>

      {/* Soft Ambient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-ieee-cyan/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-ieee-orange/10 rounded-full blur-[120px]"></div>

      {/* Abstract Tech Elements (Physical AI Theme) */}
      <div className="absolute top-[15%] left-[5%] opacity-[0.04] animate-[spin_60s_linear_infinite]">
        <Cpu className="w-64 h-64 text-ieee-blue" strokeWidth={1} />
      </div>

      <div className="absolute top-[40%] right-[10%] opacity-[0.04] animate-[spin_40s_linear_infinite_reverse]">
        <Network className="w-96 h-96 text-ieee-cyan" strokeWidth={1} />
      </div>

      <div className="absolute bottom-[15%] left-[15%] opacity-[0.04]">
        <CircuitBoard className="w-80 h-80 text-ieee-orange" strokeWidth={1} />
      </div>

      <div className="absolute top-[70%] right-[30%] opacity-[0.03]">
        <Hexagon className="w-64 h-64 text-ieee-black" strokeWidth={1} />
      </div>

      {/* Geometric Accents */}
      <div className="absolute top-[30%] right-[30%] opacity-[0.08]">
        <div
          className="w-4 h-4 border-2 border-ieee-orange rounded-full animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      <div className="absolute bottom-[40%] left-[40%] opacity-[0.08]">
        <div className="text-ieee-blue text-4xl font-mono tracking-widest">
          +
        </div>
      </div>

      <div className="absolute top-[60%] right-[20%] opacity-[0.08]">
        <div className="w-12 h-12 border-2 border-ieee-gray transform rotate-45"></div>
      </div>

      <div className="absolute top-[10%] right-[40%] opacity-[0.08]">
        <Activity className="w-12 h-12 text-ieee-cyan" strokeWidth={1.5} />
      </div>
    </div>
  );
}
