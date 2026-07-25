"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Mail,
  Save,
  Loader2,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const EMAIL_TYPES = [
  {
    id: "registration_confirmation",
    name: "Registration Confirmation",
    description: "Sent when a user submits a registration",
  },
  {
    id: "registration_approved",
    name: "Registration Approved",
    description: "Sent when admin approves a registration",
  },
  {
    id: "registration_rejected",
    name: "Registration Rejected",
    description: "Sent when admin rejects a registration",
  },
  {
    id: "partner_inquiry_confirmation",
    name: "Partner Inquiry Confirmation",
    description: "Sent when a partner submits an inquiry",
  },
  {
    id: "partner_inquiry_approved",
    name: "Partner Inquiry Approved",
    description: "Sent when admin approves a partner inquiry",
  },
  {
    id: "partner_inquiry_rejected",
    name: "Partner Inquiry Rejected",
    description: "Sent when admin rejects a partner inquiry",
  },
];

export default function EmailTemplates() {
  const { data: session } = useSession();
  const user = session?.user as unknown as { role: string } | undefined;
  const isSuperAdmin = user?.role === "superAdmin";

  const [templates, setTemplates] = useState<Record<string, string>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (!isSuperAdmin) return;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          const loaded: Record<string, string> = {};
          EMAIL_TYPES.forEach((t) => {
            loaded[t.id] = data[`email_template_${t.id}`] || "";
          });
          setTemplates(loaded);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isSuperAdmin]);

  const handleSave = async (templateId: string) => {
    setSaving(templateId);
    setSaved(null);
    try {
      await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: `email_template_${templateId}`,
          value: templates[templateId] || "",
        }),
      });
      setSaved(templateId);
      setTimeout(() => setSaved(null), 3000);
    } finally {
      setSaving(null);
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-ieee-gray/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-ieee-gray" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ieee-black">
              Email Templates
            </h3>
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
          <h3 className="text-sm font-bold text-ieee-black">
            Email Templates
          </h3>
          <p className="text-xs text-ieee-gray">
            SuperAdmin only — customize email content
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 text-ieee-gray animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {EMAIL_TYPES.map((type) => {
            const isExpanded = expandedId === type.id;
            const templateContent = templates[type.id] || "";
            const hasCustom = templateContent.length > 0;

            return (
              <div
                key={type.id}
                className="border border-ieee-gray/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : type.id)
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-ieee-gray/5 transition-colors text-left"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-ieee-black">
                        {type.name}
                      </span>
                      {hasCustom && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ieee-gray mt-0.5">
                      {type.description}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-ieee-gray" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ieee-gray" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-ieee-gray/10 pt-4">
                    <label className="text-xs font-bold text-ieee-black uppercase tracking-wider mb-2 block">
                      Custom HTML Template
                    </label>
                    <textarea
                      value={templateContent}
                      onChange={(e) =>
                        setTemplates((prev) => ({
                          ...prev,
                          [type.id]: e.target.value,
                        }))
                      }
                      placeholder="Leave empty to use default template..."
                      rows={8}
                      className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm font-mono text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-ieee-gray">
                        {hasCustom
                          ? "Custom template active — will be used instead of default"
                          : "Using default template"}
                      </p>
                      <button
                        onClick={() => handleSave(type.id)}
                        disabled={saving === type.id}
                        className="flex items-center gap-2 px-4 py-2 bg-ieee-blue text-white rounded-xl text-xs font-bold hover:bg-ieee-blue/90 transition-colors disabled:opacity-50"
                      >
                        {saving === type.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : saved === type.id ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Save className="w-3 h-3" />
                        )}
                        {saved === type.id ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
