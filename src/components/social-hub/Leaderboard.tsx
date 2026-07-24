import { Trophy } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  badge: string;
  avatar: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardUser[];
  isLoading: boolean;
}

function SkeletonRow() {
  return (
    <div className="p-4 rounded-2xl flex items-center justify-between border border-ieee-gray/5 bg-white animate-pulse">
      <div className="flex items-center gap-3.5">
        <div className="w-6 h-6 rounded-full bg-ieee-gray/10" />
        <div className="w-10 h-10 rounded-full bg-ieee-gray/10" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-ieee-gray/10 rounded" />
          <div className="h-2 w-16 bg-ieee-gray/10 rounded" />
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-8 bg-ieee-gray/10 rounded ml-auto" />
        <div className="h-2 w-10 bg-ieee-gray/10 rounded ml-auto" />
      </div>
    </div>
  );
}

export default function Leaderboard({ leaderboard, isLoading }: LeaderboardProps) {
  return (
    <div className="lg:col-span-4 bg-white/70 backdrop-blur-xl border border-ieee-gray/10 p-6 rounded-[2.5rem] shadow-sm space-y-6">
      <div className="text-center">
        <Trophy className="w-10 h-10 text-ieee-orange mx-auto mb-2" />
        <h2 className="text-xl font-black font-heading text-ieee-black">
          Influencer Leaderboard
        </h2>
        <p className="text-xs text-ieee-gray mt-1">
          Live standings of top amplifiers
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="py-8 text-center text-xs text-ieee-gray font-semibold">
          No approved leaders yet. Complete a quest to claim your spot!
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div
              key={user.name}
              className="p-4 rounded-2xl flex items-center justify-between border border-ieee-gray/5 bg-white"
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    user.rank === 1
                      ? "bg-amber-100 text-amber-700"
                      : user.rank === 2
                        ? "bg-slate-200 text-slate-700"
                        : user.rank === 3
                          ? "bg-orange-100 text-orange-700"
                          : "bg-ieee-gray/10 text-ieee-gray"
                  }`}
                >
                  {user.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-ieee-blue/10 flex items-center justify-center font-bold text-ieee-blue text-sm shrink-0">
                  {user.avatar}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-sm text-ieee-black truncate">
                    {user.name}
                  </div>
                  <div className="text-xxs text-ieee-gray uppercase font-bold tracking-wider truncate">
                    {user.badge}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-black text-sm text-ieee-blue">
                  {user.points}
                </div>
                <div className="text-xxs text-ieee-gray uppercase tracking-wider font-bold">
                  Points
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
