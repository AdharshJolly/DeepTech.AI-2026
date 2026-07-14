"use client";

import React, { useEffect, useState } from "react";
import { Check, X, ExternalLink, RefreshCw, Award } from "lucide-react";

interface SocialSubmission {
  _id: string;
  email: string;
  socialHandle: string;
  questId: string;
  postUrl: string;
  status: "pending" | "approved" | "rejected";
  points: number;
  createdAt: string;
}

const QUEST_NAMES: Record<string, string> = {
  "quest-1": "The Announcer (LinkedIn Flyer Share)",
  "quest-2": "Network Builder (Instagram Colleague Tag)",
  "quest-3": "Visionary Attendee (X Event Announcement)",
  "quest-4": "Amplifier (Retweet/Repost Announcement)"
};

export default function AdminSocialPage() {
  const [submissions, setSubmissions] = useState<SocialSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"pending" | "approved" | "rejected">("pending");

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/social");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Failed to fetch social claims:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });

      if (res.ok) {
        // Update local state
        setSubmissions(prev =>
          prev.map(sub => (sub._id === id ? { ...sub, status } : sub))
        );
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update submission status");
      }
    } catch (err) {
      console.error(err);
      alert("Network error updating submission status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = submissions.filter(sub => sub.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ieee-black">Social Claims & Quests</h1>
          <p className="text-sm text-ieee-gray mt-1">
            Review and approve user social posts to credit their points and display them on the live Social Hub leaderboard.
          </p>
        </div>
        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-ieee-gray/10 hover:border-ieee-blue/20 text-ieee-gray hover:text-ieee-blue px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-xs active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Tab controls */}
      <div className="flex border-b border-ieee-gray/10 gap-6">
        {(["pending", "approved", "rejected"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-3 text-sm font-bold border-b-2 transition-all capitalize ${
              filter === tab
                ? "border-ieee-blue text-ieee-blue"
                : "border-transparent text-ieee-gray hover:text-ieee-black"
            }`}
          >
            {tab} ({submissions.filter(sub => sub.status === tab).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-ieee-gray font-semibold">Loading submissions...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-ieee-gray font-semibold border border-ieee-gray/5">
          No {filter} claims found.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-ieee-gray/5 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ieee-gray/5 border-b border-ieee-gray/10 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  <th className="px-6 py-4">User Handle / Email</th>
                  <th className="px-6 py-4">Quest Details</th>
                  <th className="px-6 py-4">Post Link</th>
                  <th className="px-6 py-4">Points</th>
                  {filter === "pending" && <th className="px-6 py-4 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-ieee-gray/5 text-sm text-ieee-black font-medium">
                {filtered.map(sub => (
                  <tr key={sub._id} className="hover:bg-ieee-gray/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-ieee-blue">{sub.socialHandle}</div>
                        <div className="text-xs text-ieee-gray font-medium mt-0.5">{sub.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-ieee-orange shrink-0" />
                        <span>{QUEST_NAMES[sub.questId] || sub.questId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={sub.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-ieee-cyan hover:underline"
                      >
                        Verify Post <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-ieee-blue/10 text-ieee-blue px-2.5 py-1 rounded-full text-xs font-bold">
                        +{sub.points} PTS
                      </span>
                    </td>
                    {filter === "pending" && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStatus(sub._id, "approved")}
                            disabled={updatingId !== null}
                            className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white p-2 rounded-xl transition-all"
                            title="Approve Submission"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(sub._id, "rejected")}
                            disabled={updatingId !== null}
                            className="bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white p-2 rounded-xl transition-all"
                            title="Reject Submission"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
