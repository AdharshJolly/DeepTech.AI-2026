"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Lock, Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { update } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        await update();
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Failed to change password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ieee-gray/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-ieee-orange/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-ieee-orange" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-ieee-black">
            Change Your Password
          </h1>
          <p className="text-sm text-ieee-gray mt-2">
            This is your first login. Please set a new password to continue.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-ieee-gray/10 shadow-sm">
          {error && (
            <div className="p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue transition-all"
                required
                minLength={8}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue transition-all"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
