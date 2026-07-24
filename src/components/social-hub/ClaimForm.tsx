"use client";

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";
import { QUESTS } from "@/config/quests";

interface ClaimFormProps {
  claimedQuests: string[];
  onClaimedQuestsUpdate: (quests: string[]) => void;
  onSuccess: (questId: string) => void;
  onToast: (message: string, type: "success" | "error") => void;
}

interface FormErrors {
  questId?: string;
  email?: string;
  handle?: string;
  postUrl?: string;
}

export default function ClaimForm({
  claimedQuests,
  onClaimedQuestsUpdate,
  onSuccess,
  onToast,
}: ClaimFormProps) {
  const [questId, setQuestId] = useState<string>("quest-1");
  const [email, setEmail] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingClaims, setCheckingClaims] = useState(false);
  const [urlStatus, setUrlStatus] = useState<{
    checking: boolean;
    taken: boolean;
    claimedBy?: string;
  }>({ checking: false, taken: false });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const urlDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check database for claimed quests when email changes
  useEffect(() => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onClaimedQuestsUpdate([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setCheckingClaims(true);
      try {
        const res = await fetch(
          `/api/social/claims?email=${encodeURIComponent(email)}`
        );
        if (res.ok) {
          const data = await res.json();
          onClaimedQuestsUpdate(data.claimed || []);
        }
      } catch {
        // silently fail — server-side validation will catch duplicates anyway
      } finally {
        setCheckingClaims(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [email, onClaimedQuestsUpdate]);

  // Check database for duplicate post URL
  useEffect(() => {
    let cancelled = false;

    const checkUrl = async () => {
      if (!postUrl || !/^https?:\/\/.+/.test(postUrl)) return;

      setUrlStatus((prev) => ({ ...prev, checking: true }));

      // Debounce
      await new Promise((resolve) => {
        urlDebounceRef.current = setTimeout(resolve, 600);
      });

      if (cancelled) return;

      try {
        const res = await fetch(
          `/api/social/check-url?url=${encodeURIComponent(postUrl)}`
        );
        if (res.ok && !cancelled) {
          const data = await res.json();
          setUrlStatus({
            checking: false,
            taken: data.taken,
            claimedBy: data.claimedBy,
          });
        }
      } catch {
        if (!cancelled) setUrlStatus({ checking: false, taken: false });
      }
    };

    checkUrl();

    return () => {
      cancelled = true;
      if (urlDebounceRef.current) clearTimeout(urlDebounceRef.current);
    };
  }, [postUrl]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!handle || handle.trim().length < 2) {
      newErrors.handle = "Please enter your social handle";
    }
    if (!postUrl || !/^https?:\/\/.+/.test(postUrl)) {
      newErrors.postUrl = "Please enter a valid post URL";
    } else if (urlStatus.taken) {
      newErrors.postUrl = `This link was already claimed by ${urlStatus.claimedBy || "another user"}`;
    }
    if (claimedQuests.includes(questId)) {
      newErrors.questId = "You have already claimed this quest";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const quest = QUESTS.find((q) => q.id === questId);
    if (!quest) return;

    setIsSubmitting(true);
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
        onSuccess(questId);
        setSubmitSuccess(
          "Claim submitted! Points will appear once verified by our team."
        );
        setPostUrl("");
        setErrors({});

        setTimeout(() => setSubmitSuccess(null), 4000);
      } else {
        const errData = await res.json();
        onToast(errData.error || "Failed to submit claim", "error");
      }
    } catch {
      onToast("Network error submitting claim", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-4xl p-8 border border-ieee-gray/10 mt-12 space-y-6">
      <div>
        <h3 className="text-xl font-bold font-heading text-ieee-black">
          Claim Your Points
        </h3>
        <p className="text-xs text-ieee-gray mt-1">
          Once you make the social post, select the quest below, paste your
          link, and submit to verify and update the leaderboard.
        </p>
      </div>

      {submitSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 text-sm font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {submitSuccess}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Select Quest
            </label>
            <div className="relative">
              <select
                value={questId}
                onChange={(e) => {
                  setQuestId(e.target.value);
                  setErrors((prev) => ({ ...prev, questId: undefined }));
                }}
                className={`w-full bg-ieee-gray/5 border rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold ${
                  errors.questId ? "border-red-400" : "border-ieee-gray/15"
                }`}
              >
                {QUESTS.map((q) => (
                  <option
                    key={q.id}
                    value={q.id}
                    disabled={claimedQuests.includes(q.id)}
                  >
                    {q.title} (+{q.points} pts)
                    {claimedQuests.includes(q.id) ? " — Already claimed" : ""}
                  </option>
                ))}
              </select>
              {checkingClaims && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ieee-blue animate-spin" />
              )}
            </div>
            {errors.questId && (
              <p className="text-xs text-red-500 font-medium">{errors.questId}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your registration email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`w-full bg-ieee-gray/5 border rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold ${
                errors.email ? "border-red-400" : "border-ieee-gray/15"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Social Handle
            </label>
            <input
              type="text"
              placeholder="e.g. @your_name"
              value={handle}
              onChange={(e) => {
                setHandle(e.target.value);
                setErrors((prev) => ({ ...prev, handle: undefined }));
              }}
              className={`w-full bg-ieee-gray/5 border rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold ${
                errors.handle ? "border-red-400" : "border-ieee-gray/15"
              }`}
            />
            {errors.handle && (
              <p className="text-xs text-red-500 font-medium">{errors.handle}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
            Shared Post Link / URL
          </label>
          <div className="relative">
            <input
              type="url"
              placeholder="Paste link to your post (LinkedIn, Instagram, or X)"
              value={postUrl}
              onChange={(e) => {
                setPostUrl(e.target.value);
                setErrors((prev) => ({ ...prev, postUrl: undefined }));
              }}
              className={`w-full bg-ieee-gray/5 border rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:border-ieee-blue font-semibold ${
                errors.postUrl
                  ? "border-red-400"
                  : urlStatus.taken
                    ? "border-red-400"
                    : "border-ieee-gray/15"
              }`}
            />
            {urlStatus.checking && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ieee-blue animate-spin" />
            )}
            {!urlStatus.checking && urlStatus.taken && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">
                Taken
              </span>
            )}
          </div>
          {errors.postUrl && (
            <p className="text-xs text-red-500 font-medium">{errors.postUrl}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Submitting..." : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
}
