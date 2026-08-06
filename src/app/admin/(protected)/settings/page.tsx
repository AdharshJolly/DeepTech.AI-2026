"use client";

import React, { useEffect, useState } from "react";
import { Save, RefreshCw, Link as LinkIcon, Calendar, Mail } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        // Initialize with default keys if missing
        setSettings({
          cta_partner_login: data.cta_partner_login || "https://deep-tech-ai-26.vercel.app/login",
          cta_registration_calendar: data.cta_registration_calendar || "https://www.google.com/calendar/render?...",
          event_date: data.event_date || "Friday, October 30, 2026",
          event_venue: data.event_venue || "GE Healthcare, Bengaluru",
          admin_cc_email: data.admin_cc_email || "",
          admin_bcc_email: data.admin_bcc_email || "",
          contact_email: data.contact_email || "ieee.deeptech@gmail.com",
          url_website: data.url_website || "https://deeptech.ai",
          url_linkedin: data.url_linkedin || "https://www.linkedin.com/company/ieeecsbc/",
          url_twitter: data.url_twitter || "https://twitter.com/ieeecsbc",
          url_instagram: data.url_instagram || "https://www.instagram.com/ieeecsbc",
          ...data
        });
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showToast("Settings updated successfully!", "success");
      } else {
        showToast("Failed to save settings", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return <div className="py-20 text-center text-ieee-gray font-semibold">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg font-bold shadow-lg z-50 ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-ieee-black">Global Configuration</h1>
          <p className="text-sm text-ieee-gray mt-1">Manage event details, email CTA links, and admin notifications.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchSettings} disabled={saving} className="flex items-center gap-2 bg-white border border-ieee-gray/20 hover:border-ieee-blue/30 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-ieee-blue hover:bg-ieee-blue/90 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-md">
            <Save className={`w-4 h-4 ${saving ? "animate-pulse" : ""}`} /> {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Email CTA Links */}
        <div className="bg-white rounded-3xl border border-ieee-gray/10 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2 mb-6">
            <LinkIcon className="w-5 h-5 text-ieee-blue" /> Email Call-To-Action (CTA) Links
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Partner Approved CTA Link</label>
              <input type="url" value={settings.cta_partner_login} onChange={e => handleChange("cta_partner_login", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
              <p className="text-xs text-ieee-gray/70 mt-1">URL for the "Log in to Partner Dashboard" button in approval emails.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Registration Approved Calendar CTA</label>
              <input type="url" value={settings.cta_registration_calendar} onChange={e => handleChange("cta_registration_calendar", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
              <p className="text-xs text-ieee-gray/70 mt-1">Google Calendar render URL embedded in attendee registration approval emails.</p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-white rounded-3xl border border-ieee-gray/10 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-ieee-orange" /> Global Event Variables
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Event Date & Time</label>
              <input type="text" value={settings.event_date} onChange={e => handleChange("event_date", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-orange focus:ring-1 focus:ring-ieee-orange outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Event Venue</label>
              <input type="text" value={settings.event_venue} onChange={e => handleChange("event_venue", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-orange focus:ring-1 focus:ring-ieee-orange outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Social & Contact Links */}
        <div className="bg-white rounded-3xl border border-ieee-gray/10 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2 mb-6">
            <LinkIcon className="w-5 h-5 text-ieee-blue" /> Brand & Contact Links
          </h2>
          <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1">
            <div className="md:col-span-2 space-y-0">
              <label className="block text-sm font-bold text-ieee-gray mb-1.5 mt-2">Support Contact Email</label>
              <input type="email" value={settings.contact_email} onChange={e => handleChange("contact_email", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5 mt-4">Website URL</label>
              <input type="url" value={settings.url_website} onChange={e => handleChange("url_website", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5 mt-4">LinkedIn URL</label>
              <input type="url" value={settings.url_linkedin} onChange={e => handleChange("url_linkedin", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5 mt-4">X (Twitter) URL</label>
              <input type="url" value={settings.url_twitter} onChange={e => handleChange("url_twitter", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5 mt-4">Instagram URL</label>
              <input type="url" value={settings.url_instagram} onChange={e => handleChange("url_instagram", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-blue focus:ring-1 focus:ring-ieee-blue outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* System Emails */}
        <div className="bg-white rounded-3xl border border-ieee-gray/10 p-8 shadow-sm">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2 mb-6">
            <Mail className="w-5 h-5 text-ieee-cyan" /> Notification Delivery
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Admin CC Email</label>
              <input type="email" value={settings.admin_cc_email} onChange={e => handleChange("admin_cc_email", e.target.value)} placeholder="comma-separated emails" className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-cyan focus:ring-1 focus:ring-ieee-cyan outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ieee-gray mb-1.5">Admin BCC Email</label>
              <input type="email" value={settings.admin_bcc_email} onChange={e => handleChange("admin_bcc_email", e.target.value)} placeholder="comma-separated emails" className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:border-ieee-cyan focus:ring-1 focus:ring-ieee-cyan outline-none transition-all" />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
