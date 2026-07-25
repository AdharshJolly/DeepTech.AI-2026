"use client";

import { useState, useEffect } from "react";
import { Mail, Save, Loader2, CheckCircle } from "lucide-react";

export default function EmailSettings() {
  const [ccEmail, setCcEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setCcEmail(data.admin_cc_email || "");
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "admin_cc_email", value: ccEmail }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-ieee-cyan/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-ieee-cyan" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-ieee-black">Email Settings</h3>
          <p className="text-xs text-ieee-gray">Configure notification emails</p>
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
              CC Email for Notifications
            </label>
            <input
              type="email"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
            <p className="text-xs text-ieee-gray">
              This email receives a copy of all confirmation emails sent to users.
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
