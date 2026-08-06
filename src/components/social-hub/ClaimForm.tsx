"use client";

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, Loader2, Lock, X, AlertCircle, ArrowRight, Share2 } from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";
import { QUESTS } from "@/config/quests";
import Link from "next/link";
import { useSession } from "next-auth/react";

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

  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [requiresLoginError, setRequiresLoginError] = useState(false);

  const { data: session } = useSession();

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

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setRequiresLoginError(false);

    // Try a "dry-run" submission to see if it requires password/login
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/social/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, socialHandle: handle, questId, postUrl }),
      });

      if (res.ok) {
        completeSuccess();
      } else {
        const errData = await res.json();
        if (errData.requiresPassword) {
          setShowPasswordModal(true);
        } else if (errData.requiresLogin) {
          setRequiresLoginError(true);
        } else {
          onToast(errData.error || "Failed to submit claim", "error");
        }
      }
    } catch {
      onToast("Network error submitting claim", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/social/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, socialHandle: handle, questId, postUrl, password }),
      });

      if (res.ok) {
        setShowPasswordModal(false);
        completeSuccess();
      } else {
        const errData = await res.json();
        setPasswordError(errData.error || "Failed to submit claim");
      }
    } catch {
      setPasswordError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeSuccess = () => {
    gaEvent({
      action: "quest_claim",
      category: "Social Hub",
      label: questId,
    });
    onSuccess(questId);
    setSubmitSuccess(
      "Claim submitted! You can now log in to your dashboard to check its status."
    );
    setPostUrl("");
    setErrors({});
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => setSubmitSuccess(null), 6000);
  };

  return (
    <div className="bg-white rounded-4xl p-8 border border-ieee-gray/10 mt-12 space-y-6 relative">
      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ieee-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-6 right-6 text-ieee-gray hover:text-ieee-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 bg-ieee-cyan/10 rounded-full flex items-center justify-center mb-6 text-ieee-cyan">
              <Lock className="w-6 h-6" />
            </div>
            
            <h3 className="text-2xl font-bold font-heading text-ieee-black mb-2">
              Set your Password
            </h3>
            <p className="text-ieee-gray text-sm mb-6 leading-relaxed">
              Create a password to unlock your Social Dashboard and track your points!
            </p>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              {passwordError && (
                <div className="p-3 rounded-xl flex items-center gap-2 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {passwordError}
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Password *
                </label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-cyan font-semibold transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-cyan font-semibold transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Submit & Set Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Login Banner */}
      <div className="mb-2">
        {session && session.user.role === "socialUser" ? (
          <Link href="/social-dashboard" className="flex items-center justify-between p-4 bg-ieee-cyan/5 border border-ieee-cyan/20 rounded-2xl group hover:bg-ieee-cyan/10 transition-colors">
            <div className="flex items-center gap-3 text-ieee-black font-semibold text-sm">
              <div className="w-8 h-8 rounded-full bg-ieee-cyan/10 flex items-center justify-center text-ieee-cyan">
                <Share2 className="w-4 h-4" />
              </div>
              Logged in as {session.user.email}
            </div>
            <div className="text-ieee-cyan font-bold text-sm flex items-center gap-1">
              Go to Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ) : (
          <Link href="/admin/login" className="flex items-center justify-between p-4 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl group hover:border-ieee-blue/30 transition-colors">
            <div className="flex items-center gap-3 text-ieee-gray font-semibold text-sm group-hover:text-ieee-black transition-colors">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-ieee-gray group-hover:text-ieee-blue transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              Already have an account?
            </div>
            <div className="text-ieee-gray group-hover:text-ieee-blue font-bold text-sm transition-colors flex items-center gap-1">
              Log in to your Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )}
      </div>

      <div>
        <h3 className="text-xl font-bold font-heading text-ieee-black">
          Claim Your Points
        </h3>
        <p className="text-xs text-ieee-gray mt-1">
          Once you make the social post, select the quest below, paste your
          link, and submit to verify and update the leaderboard.
        </p>
      </div>

      {requiresLoginError && (
        <div className="p-4 rounded-xl bg-ieee-orange/15 border border-ieee-orange/20 text-ieee-orange text-sm font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> 
            An account with this email exists.
          </div>
          <Link href="/admin/login" className="px-3 py-1 bg-white rounded-lg shadow-sm text-ieee-black text-xs hover:bg-gray-50 transition-colors">
            Log In Here
          </Link>
        </div>
      )}

      {submitSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-700 text-sm font-bold flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {submitSuccess}
          </div>
          <Link href="/admin/login" className="text-emerald-800 underline text-xs mt-1 ml-6">
            Log in to your Social Dashboard
          </Link>
        </div>
      )}

      <form onSubmit={handleInitialSubmit} className="space-y-4">
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
