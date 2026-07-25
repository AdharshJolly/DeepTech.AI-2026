"use client";

import { useState, useEffect } from "react";
import { Mail, Loader2, AlertTriangle } from "lucide-react";

export default function EmailQuotaWidget() {
  const [quota, setQuota] = useState<{ quota: number; remaining: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuota = async () => {
      try {
        const res = await fetch("/api/admin/email-quota");
        if (res.ok) setQuota(await res.json());
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchQuota();
  }, []);

  const used = quota ? quota.quota - quota.remaining : 0;
  const percentage = quota ? (used / quota.quota) * 100 : 0;
  const isLow = quota && quota.remaining < 20;
  const isCritical = quota && quota.remaining < 5;

  return (
    <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <Mail className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ieee-black">Email Quota</h3>
          <p className="text-xs text-ieee-gray">Gmail daily sending limit</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 text-ieee-gray animate-spin" />
        </div>
      ) : quota ? (
        <>
          <div className="mb-3">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-black text-ieee-black">
                {quota.remaining}
              </span>
              <span className="text-xs text-ieee-gray font-medium">
                of {quota.quota} remaining
              </span>
            </div>
            <div className="w-full h-2 bg-ieee-gray/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCritical
                    ? "bg-red-500"
                    : isLow
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-ieee-gray">
              {used} sent today
            </span>
            {isCritical && (
              <span className="flex items-center gap-1 text-red-600 font-bold">
                <AlertTriangle className="w-3 h-3" />
                Critical
              </span>
            )}
            {isLow && !isCritical && (
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <AlertTriangle className="w-3 h-3" />
                Low
              </span>
            )}
          </div>
        </>
      ) : (
        <p className="text-xs text-ieee-gray py-4 text-center">
          Could not load quota
        </p>
      )}
    </div>
  );
}
