"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Mail, Save, Loader2, CheckCircle, Lock } from "lucide-react";

export default function EmailSettings() {
  const { data: session } = useSession();
  const user = session?.user as unknown as { role: string } | undefined;
  const isSuperAdmin = user?.role === "superAdmin";

  const [ccEmail, setCcEmail] = useState("");
  const [bccEmail, setBccEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isSuperAdmin) return;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setCcEmail(data.admin_cc_email || "");
          setBccEmail(data.admin_bcc_email || "");
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isSuperAdmin]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "admin_cc_email", value: ccEmail }),
      });
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "admin_bcc_email", value: bccEmail }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 text-ieee-gray animate-spin" />
        </div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm opacity-60">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-ieee-gray/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-ieee-gray" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ieee-black">Email Settings</h3>
            <p className="text-xs text-ieee-gray">SuperAdmin only</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-ieee-cyan/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-ieee-cyan" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ieee-black">Email Settings</h3>
          <p className="text-xs text-ieee-gray">SuperAdmin only — CC/BCC notifications</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 text-ieee-gray animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              CC Email
            </label>
            <input
              type="email"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
            <p className="text-xs text-ieee-gray">
              Receives a copy of confirmation emails (visible to recipient).
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              BCC Email
            </label>
            <input
              type="email"
              value={bccEmail}
              onChange={(e) => setBccEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
            <p className="text-xs text-ieee-gray">
              Receives a blind copy of confirmation emails (hidden from recipient).
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-ieee-blue text-white rounded-xl text-sm font-bold hover:bg-ieee-blue/90 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Saved!" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
