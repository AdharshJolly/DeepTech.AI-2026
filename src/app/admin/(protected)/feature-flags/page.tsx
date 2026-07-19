"use client";

import React, { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface FeatureFlag {
  _id: string;
  key: string;
  enabled: boolean;
  updatedAt: string;
}

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchFlags = async () => {
    try {
      const res = await fetch("/api/admin/feature-flags");
      const data = await res.json();
      if (res.ok) {
        setFlags(data);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to load feature flags" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error loading flags" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleToggle = async (flag: FeatureFlag) => {
    setTogglingId(flag._id);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/feature-flags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: flag.key, enabled: !flag.enabled }),
      });
      const updated = await res.json();
      if (res.ok) {
        setFlags(flags.map(f => f.key === flag.key ? updated : f));
        setMessage({ 
          type: "success", 
          text: `Successfully ${updated.enabled ? "enabled" : "disabled"} the ${flag.key} page!` 
        });
      } else {
        setMessage({ type: "error", text: updated.error || "Failed to update feature flag" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error updating flag" });
    } finally {
      setTogglingId(null);
    }
  };

  const flagMetadata: Record<string, { title: string; desc: string }> = {
    speakers: {
      title: "Speakers Page",
      desc: "Controls access to the /speakers page. When disabled, visitors see a 'yet to be published' popup and cannot view the speakers list."
    },
    agenda: {
      title: "Agenda Page",
      desc: "Controls access to the /agenda page. When disabled, visitors see a 'yet to be published' popup and cannot view the agenda/schedule."
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Feature Flags</h1>
        <p className="text-ieee-gray">Control visibility of major event pages and components in real-time.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 border ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
            : "bg-rose-50 border-rose-100 text-rose-800"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-ieee-blue animate-spin" />
          <p className="text-sm text-ieee-gray font-medium">Fetching flags configuration...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {flags.map((flag) => {
            const meta = flagMetadata[flag.key] || { title: flag.key, desc: "Custom feature flag." };
            const isToggling = togglingId === flag._id;
            return (
              <div 
                key={flag._id} 
                className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-ieee-black">{meta.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      flag.enabled 
                        ? "bg-emerald-100 text-emerald-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {flag.enabled ? "Active / Published" : "Draft / Private"}
                    </span>
                  </div>
                  <p className="text-sm text-ieee-gray leading-relaxed">{meta.desc}</p>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <button
                    onClick={() => handleToggle(flag)}
                    disabled={isToggling}
                    className="focus:outline-none transition-transform active:scale-95 bg-transparent border-0 p-0"
                    aria-label={`Toggle ${meta.title}`}
                  >
                    {isToggling ? (
                      <Loader2 className="w-14 h-8 text-ieee-gray animate-spin" />
                    ) : flag.enabled ? (
                      <ToggleRight className="w-14 h-8 text-emerald-500 cursor-pointer" />
                    ) : (
                      <ToggleLeft className="w-14 h-8 text-ieee-gray/40 cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
