"use client";

import { useState, useEffect, useCallback } from "react";
import { Share2, MessageSquare, Zap } from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";
import { QUESTS } from "@/config/quests";

import Toast from "@/components/social-hub/Toast";
import SocialChannels from "@/components/social-hub/SocialChannels";
import QuestCard from "@/components/social-hub/QuestCard";
import ClaimForm from "@/components/social-hub/ClaimForm";
import Leaderboard from "@/components/social-hub/Leaderboard";
import SocialPostCard from "@/components/social-hub/SocialPostCard";

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  badge: string;
  avatar: string;
}

interface SocialPost {
  id: string;
  user: string;
  handle: string;
  platform: "linkedin" | "instagram" | "twitter" | "facebook";
  content: string;
  time: string;
  likes: number;
  avatar: string;
  postUrl?: string;
}

export default function SocialHubPage() {
  const [activeTab, setActiveTab] = useState<"wall" | "quests">("quests");
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLeaderboardLoading(true);
    setLeaderboardError(null);
    try {
      const res = await fetch("/api/social/leaderboard");
      if (res.ok) {
        setLeaderboard(await res.json());
      } else {
        setLeaderboardError("Failed to load leaderboard");
      }
    } catch {
      setLeaderboardError("Network error loading leaderboard");
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    setPostsError(null);
    try {
      const res = await fetch("/api/social/feed");
      if (res.ok) {
        setPosts(await res.json());
      } else {
        setPostsError("Failed to load social feed");
      }
    } catch {
      setPostsError("Network error loading social feed");
    } finally {
      setPostsLoading(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      // Fetch data
      setLeaderboardLoading(true);
      setPostsLoading(true);

      const [leaderboardRes, postsRes] = await Promise.allSettled([
        fetch("/api/social/leaderboard"),
        fetch("/api/social/feed"),
      ]);

      if (leaderboardRes.status === "fulfilled" && leaderboardRes.value.ok) {
        setLeaderboard(await leaderboardRes.value.json());
      } else {
        setLeaderboardError("Failed to load leaderboard");
      }

      if (postsRes.status === "fulfilled" && postsRes.value.ok) {
        setPosts(await postsRes.value.json());
      } else {
        setPostsError("Failed to load social feed");
      }

      setLeaderboardLoading(false);
      setPostsLoading(false);
    };
    load();
  }, []);

  const handleClaimSuccess = (questId: string) => {
    setClaimedQuests((prev) => [...prev, questId]);
    setToast({ message: "Claim submitted successfully!", type: "success" });
    fetchLeaderboard();
  };

  return (
    <main className="min-h-screen bg-ieee-white flex flex-col pt-24 relative overflow-hidden">
      {/* Grid Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-5 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-5 w-96 h-96 bg-ieee-orange/5 rounded-full blur-[150px]" />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      <section className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-ieee-cyan/10 text-ieee-cyan border border-ieee-cyan/20 uppercase tracking-widest mb-6">
            <Share2 className="w-3.5 h-3.5" /> Amplification Engine
          </span>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-ieee-black tracking-tight leading-none mb-6">
            DeepTech{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
              Social Hub
            </span>
          </h1>
          <p className="text-lg text-ieee-gray leading-relaxed font-medium">
            Spread the word about DeepTech.AI 2026, complete quests, earn
            points, and win exclusive IEEE CS merchandise and front-row seating
            perks.
          </p>

          <SocialChannels />
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-12">
          <div className="bg-ieee-gray/5 p-1.5 rounded-full border border-ieee-gray/10 flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab("quests");
                gaEvent({
                  action: "tab_switch",
                  category: "Social Hub",
                  label: "quests",
                });
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === "quests"
                  ? "bg-white text-ieee-blue shadow-md"
                  : "text-ieee-gray hover:text-ieee-black"
              }`}
            >
              Quests & Leaderboard
            </button>
            <button
              onClick={() => {
                setActiveTab("wall");
                gaEvent({
                  action: "tab_switch",
                  category: "Social Hub",
                  label: "wall",
                });
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === "wall"
                  ? "bg-white text-ieee-blue shadow-md"
                  : "text-ieee-gray hover:text-ieee-black"
              }`}
            >
              Community Feed
            </button>
          </div>
        </div>

        {/* Quest Section */}
        {activeTab === "quests" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-bold font-heading text-ieee-black mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-ieee-orange" /> Available Quests
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {QUESTS.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    isCompleted={claimedQuests.includes(quest.id)}
                  />
                ))}
              </div>

              <ClaimForm
                claimedQuests={claimedQuests}
                onClaimedQuestsUpdate={setClaimedQuests}
                onSuccess={handleClaimSuccess}
                onToast={(message, type) => setToast({ message, type })}
              />
            </div>

            <Leaderboard
              leaderboard={leaderboard}
              isLoading={leaderboardLoading}
            />

            {leaderboardError && (
              <div className="lg:col-span-4">
                <p className="text-sm text-red-500 font-medium text-center">
                  {leaderboardError}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Community Feed Tab */}
        {activeTab === "wall" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-heading text-ieee-black flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-ieee-cyan" /> Community
                Feed
              </h2>
              <button
                onClick={fetchPosts}
                className="text-xs font-bold text-ieee-cyan hover:underline"
              >
                Refresh
              </button>
            </div>

            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 border border-ieee-gray/10 animate-pulse"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-ieee-gray/10" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-20 bg-ieee-gray/10 rounded" />
                        <div className="h-2 w-16 bg-ieee-gray/10 rounded" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-ieee-gray/10 rounded" />
                      <div className="h-3 w-3/4 bg-ieee-gray/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : postsError ? (
              <div className="bg-white rounded-3xl p-16 text-center text-ieee-gray font-semibold border border-ieee-gray/10 max-w-lg mx-auto">
                <p className="text-base text-red-500">{postsError}</p>
                <button
                  onClick={fetchPosts}
                  className="mt-4 text-sm font-bold text-ieee-cyan hover:underline"
                >
                  Try Again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center text-ieee-gray font-semibold border border-ieee-gray/10 max-w-lg mx-auto">
                <Share2 className="w-12 h-12 text-ieee-orange/30 mx-auto mb-4" />
                <p className="text-base text-ieee-black">
                  No verified social wall posts yet.
                </p>
                <p className="text-xs text-ieee-gray mt-1">
                  Complete a quest and submit your post link to show up here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <SocialPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
