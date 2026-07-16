"use client";

import React, { useState, useEffect, useCallback } from "react";

import {
  Share2,
  Award,
  Trophy,
  Sparkles,
  Heart,
  MessageSquare,
  Send,
  CheckCircle,
  Zap,
} from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

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
  shares: number;
  avatar: string;
  postUrl?: string;
}

export default function SocialHubPage() {
  const [activeTab, setActiveTab] = useState<"wall" | "quests">("quests");
  const [userPoints, setUserPoints] = useState<number>(0);
  const [claimedQuests, setClaimedQuests] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Form State
  const [questId, setQuestId] = useState<string>("quest-1");
  const [email, setEmail] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");

  const quests = [
    {
      id: "quest-1",
      title: "The Announcer",
      points: 50,
      description:
        "Share the DeepTech.AI 2026 registration flyer on LinkedIn using #DeepTechAI2026.",
      actionText: "Share on LinkedIn",
      shareUrl:
        "https://www.linkedin.com/sharing/share-offsite/?url=https://deeptech.ai",
    },
    {
      id: "quest-2",
      title: "Network Builder",
      points: 70,
      description:
        "Tag 3 colleagues in our latest Instagram announcement post and invite them to the summit.",
      actionText: "Go to Instagram",
      shareUrl: "https://www.instagram.com/ieeecsbc",
    },
    {
      id: "quest-3",
      title: "Visionary Attendee",
      points: 100,
      description:
        "Post your excitement about attending or speaking at DeepTech.AI 2026 on X (formerly Twitter) with #DeepTechAI2026.",
      actionText: "Post on X",
      shareUrl:
        "https://twitter.com/intent/tweet?text=I'm%20excited%20to%20attend%20%23DeepTechAI2026!%20Join%20me%20for%20the%20flagship%20symposium.%20https://deeptech.ai",
    },
    {
      id: "quest-4",
      title: "Amplifier",
      points: 40,
      description:
        "Retweet/repost our latest keynote speaker announcement on X.",
      actionText: "Retweet on X",
      shareUrl: "https://twitter.com/ieeecsbc",
    },
  ];

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);

  const fetchLiveFeed = async () => {
    try {
      const res = await fetch("/api/social/feed");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/social/leaderboard");
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchLiveFeed();
    fetchLeaderboard();

    // Check localStorage for email and completed quests
    const savedEmail = localStorage.getItem("deeptech_social_email");
    if (savedEmail) {
      setEmail(savedEmail);
      const savedClaims = localStorage.getItem(`claims_${savedEmail}`);
      if (savedClaims) {
        try {
          const parsed = JSON.parse(savedClaims);
          setClaimedQuests(parsed);
          const total = parsed.reduce((sum: number, qId: string) => {
            const q = quests.find((item) => item.id === qId);
            return sum + (q ? q.points : 0);
          }, 0);
          setUserPoints(total);
        } catch {
          // ignore
        }
      }
    }
  }, [fetchLeaderboard]);

  const handleQuestClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !handle || !postUrl) {
      alert(
        "Please fill in all form fields (Email, Social Handle, and Post Link)!",
      );
      return;
    }

    const quest = quests.find((q) => q.id === questId);
    if (!quest) return;

    if (claimedQuests.includes(questId)) {
      alert("You have already claimed points for this quest under this email!");
      return;
    }

    try {
      const res = await fetch("/api/social/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, socialHandle: handle, questId, postUrl }),
      });

      if (res.ok) {
        gaEvent({
          action: "quest_claim",
          category: "Social Hub",
          label: questId,
        });
        localStorage.setItem("deeptech_social_email", email);
        const updatedClaims = [...claimedQuests, questId];
        localStorage.setItem(`claims_${email}`, JSON.stringify(updatedClaims));

        setClaimedQuests(updatedClaims);
        setUserPoints((prev) => prev + quest.points);

        setSubmitSuccess(
          `Claim submitted successfully! Points will appear on the leaderboard once verified by our team.`,
        );
        setPostUrl("");

        fetchLeaderboard();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to submit claim");
      }
    } catch (err) {
      console.error(err);
      alert("Network error submitting claim");
    }

    setTimeout(() => {
      setSubmitSuccess(null);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-ieee-white flex flex-col pt-24 relative overflow-hidden">
      {/* Grid Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-5 w-96 h-96 bg-ieee-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-5 w-96 h-96 bg-ieee-orange/5 rounded-full blur-[150px]" />
      </div>

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

          {/* Social Channels Link Cubes */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto mt-10">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/ieeecsbc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 hover:bg-sky-50/50 backdrop-blur-xl border border-ieee-gray/10 hover:border-sky-300 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-ieee-black">
                LinkedIn
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ieeecsbc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 hover:bg-pink-50/50 backdrop-blur-xl border border-ieee-gray/10 hover:border-pink-300 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-ieee-black">
                Instagram
              </span>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com/ieeecsbc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 hover:bg-slate-50/50 backdrop-blur-xl border border-ieee-gray/10 hover:border-slate-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-10 h-10 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-ieee-black">
                X (Twitter)
              </span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/ieeecsbsc/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 hover:bg-blue-50/50 backdrop-blur-xl border border-ieee-gray/10 hover:border-blue-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-ieee-black">
                Facebook
              </span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/channel/UCeBF0MYx2O2gq1_f6FeQFyQ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/60 hover:bg-rose-50/50 backdrop-blur-xl border border-ieee-gray/10 hover:border-rose-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.503a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.503 9.388.503 9.388.503s7.518 0 9.388-.503a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-ieee-black">YouTube</span>
            </a>
          </div>

          {/* User Score Summary Card */}
          <div className="mt-8 bg-linear-to-r from-ieee-blue to-ieee-cyan p-6 rounded-4xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold opacity-80 uppercase tracking-wider">
                  Your Score
                </div>
                <div className="text-3xl font-black font-heading">
                  {userPoints} PTS
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                Quests: {claimedQuests.length} / {quests.length} Completed
              </span>
            </div>
          </div>
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
                fetchLiveFeed();
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
              Live Social Wall
            </button>
          </div>
        </div>

        {/* Quest Section */}
        {activeTab === "quests" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Quest Board (Spans 8 columns) */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-bold font-heading text-ieee-black mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-ieee-orange" /> Available Quests
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {quests.map((quest) => {
                  const isCompleted = claimedQuests.includes(quest.id);
                  return (
                    <div
                      key={quest.id}
                      className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg ${
                        isCompleted
                          ? "border-emerald-200 bg-emerald-50/10"
                          : "border-ieee-gray/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-ieee-orange/10 text-ieee-orange"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <Award className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-ieee-black leading-tight">
                              {quest.title}
                            </h3>
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                isCompleted
                                  ? "bg-emerald-200/50 text-emerald-700"
                                  : "bg-ieee-blue/15 text-ieee-blue"
                              }`}
                            >
                              +{quest.points} PTS
                            </span>
                          </div>
                          <p className="text-sm text-ieee-gray mt-1 leading-normal">
                            {quest.description}
                          </p>
                        </div>
                      </div>
                      <a
                        href={quest.shareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          gaEvent({
                            action: "quest_link_click",
                            category: "Social Hub",
                            label: quest.id,
                          })
                        }
                        className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-center text-sm font-bold transition-all shrink-0 ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800 pointer-events-none cursor-default"
                            : "bg-ieee-black text-white hover:bg-ieee-blue"
                        }`}
                      >
                        {isCompleted ? "Quest Claimed" : quest.actionText}
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Submit Points Claim Form */}
              <div className="bg-white rounded-4xl p-8 border border-ieee-gray/10 mt-12 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-ieee-black">
                    Claim Your Points
                  </h3>
                  <p className="text-xs text-ieee-gray mt-1">
                    Once you make the social post, select the quest below, paste
                    your link, and submit to verify and update the leaderboard.
                  </p>
                </div>

                {submitSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 text-sm font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {submitSuccess}
                  </div>
                )}

                <form onSubmit={handleQuestClaim} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                        Select Quest
                      </label>
                      <select
                        value={questId}
                        onChange={(e) => setQuestId(e.target.value)}
                        className="w-full bg-ieee-gray/5 border border-ieee-gray/15 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold"
                      >
                        {quests.map((q) => (
                          <option
                            key={q.id}
                            value={q.id}
                            disabled={claimedQuests.includes(q.id)}
                          >
                            {q.title} (+{q.points} pts)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your registration email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-ieee-gray/5 border border-ieee-gray/15 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                        Social Handle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. @your_name"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full bg-ieee-gray/5 border border-ieee-gray/15 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                      Shared Post Link / URL
                    </label>
                    <input
                      type="url"
                      placeholder="Paste link to your post (LinkedIn, Instagram, or X)"
                      value={postUrl}
                      onChange={(e) => setPostUrl(e.target.value)}
                      className="w-full bg-ieee-gray/5 border border-ieee-gray/15 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit for Verification
                  </button>
                </form>
              </div>
            </div>

            {/* Leaderboard (Spans 4 columns) */}
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

              {leaderboard.length === 0 ? (
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
          </div>
        )}

        {/* Live Social Wall Tab */}
        {activeTab === "wall" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-heading text-ieee-black flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-ieee-cyan" /> Community
                Live Feed
              </h2>
              <span className="text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1.5 rounded-full animate-pulse flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Live
                Feed
              </span>
            </div>

            {posts.length === 0 ? (
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
                {posts.map((post) => {
                  const igMatch = post.postUrl?.match(
                    /instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/,
                  );
                  const igEmbedUrl =
                    igMatch && igMatch[1]
                      ? `https://www.instagram.com/p/${igMatch[1]}/embed`
                      : null;

                  if (igEmbedUrl) {
                    return (
                      <div
                        key={post.id}
                        className="bg-white rounded-3xl overflow-hidden border border-ieee-gray/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="relative w-full h-100">
                          <iframe
                            src={igEmbedUrl}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                            scrolling="no"
                          />
                        </div>
                        <div className="p-4 bg-ieee-gray/5 border-t border-ieee-gray/5 flex items-center justify-between text-xxs font-bold text-ieee-gray">
                          <span>Instagram Post</span>
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ieee-cyan hover:underline"
                          >
                            View Original
                          </a>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-ieee-blue/10 flex items-center justify-center font-bold text-ieee-blue text-sm shrink-0">
                              {post.avatar}
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-bold text-sm text-ieee-black truncate">
                                {post.user}
                              </div>
                              <div className="text-xs text-ieee-gray truncate">
                                {post.handle}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`text-xxs font-black uppercase tracking-wider px-2 py-1 rounded-full ${
                              post.platform === "linkedin"
                                ? "bg-sky-100 text-sky-700"
                                : post.platform === "instagram"
                                  ? "bg-pink-100 text-pink-700"
                                  : post.platform === "twitter"
                                    ? "bg-slate-100 text-slate-700"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {post.platform}
                          </span>
                        </div>

                        <p className="text-sm text-ieee-black leading-relaxed font-medium">
                          {post.content}
                        </p>

                        {post.postUrl && (
                          <div className="pt-2">
                            <a
                              href={post.postUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                                post.platform === "linkedin"
                                  ? "border-sky-200 text-sky-700 bg-sky-50/50 hover:bg-sky-50"
                                  : "border-slate-200 text-slate-800 bg-slate-50/50 hover:bg-slate-50"
                              }`}
                            >
                              View Post on{" "}
                              {post.platform === "linkedin"
                                ? "LinkedIn"
                                : "X (Twitter)"}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-6 border-t border-ieee-gray/5 text-xxs font-bold text-ieee-gray">
                        <span>{post.time}</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />{" "}
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5 text-ieee-cyan" />{" "}
                            {post.shares}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
