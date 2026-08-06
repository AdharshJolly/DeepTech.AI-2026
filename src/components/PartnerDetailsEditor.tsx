"use client";

import { useState } from "react";
import { CalendarClock, Edit2, X, Check, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PARTNERSHIP_TYPES = [
  "Sponsorship",
  "Technology Partner",
  "Community Partner",
  "Academic Partner",
  "Startup Partner",
  "Media Partner",
  "Exhibition Booth",
  "Workshop",
  "Hiring Partner",
  "Not Sure Yet",
];

interface PartnerInquiryType {
  _id: string;
  organizationName: string;
  contactPerson: string;
  workEmail: string;
  designation: string;
  partnershipTypes: string[];
  collaborationNotes: string;
  website?: string;
  additionalNotes?: string;
  status: "pending" | "approved" | "rejected";
}

export default function PartnerDetailsEditor({ inquiry }: { inquiry: PartnerInquiryType }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    organizationName: inquiry.organizationName || "",
    contactPerson: inquiry.contactPerson || "",
    designation: inquiry.designation || "",
    website: inquiry.website || "",
    collaborationNotes: inquiry.collaborationNotes || "",
    additionalNotes: inquiry.additionalNotes || "",
    partnershipTypes: inquiry.partnershipTypes || [],
  });

  const toggleType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      partnershipTypes: prev.partnershipTypes.includes(type)
        ? prev.partnershipTypes.filter((t: string) => t !== type)
        : [...prev.partnershipTypes, type],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.partnershipTypes.length === 0) {
      setError("Please select at least one partnership type.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update details.");
      }

      setIsEditing(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canEdit = inquiry.status === "pending";

  if (!isEditing) {
    return (
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-ieee-gray/10 shadow-sm relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-ieee-blue" />
            Your Submission Details
          </h2>
          {canEdit && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-ieee-blue bg-ieee-blue/10 hover:bg-ieee-blue/20 rounded-xl transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Details
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Organization</p>
            <p className="text-sm font-semibold text-ieee-black">{inquiry.organizationName}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Contact Email</p>
            <p className="text-sm font-semibold text-ieee-black">{inquiry.workEmail} <span className="text-ieee-gray/50 text-xs font-normal">(Non-editable)</span></p>
          </div>
          <div>
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Contact Person</p>
            <p className="text-sm font-semibold text-ieee-black">{inquiry.contactPerson}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Designation</p>
            <p className="text-sm font-semibold text-ieee-black">{inquiry.designation}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Website</p>
            <p className="text-sm font-semibold text-ieee-black">{inquiry.website || "N/A"}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-2">Partnership Types</p>
            <div className="flex flex-wrap gap-2">
              {inquiry.partnershipTypes.map((type: string) => (
                <span key={type} className="bg-ieee-gray/5 border border-ieee-gray/10 text-ieee-black px-3 py-1.5 rounded-xl text-xs font-bold">
                  {type}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Collaboration Notes</p>
            <p className="text-sm text-ieee-black leading-relaxed">{inquiry.collaborationNotes}</p>
          </div>
          {inquiry.additionalNotes && (
            <div className="md:col-span-2">
              <p className="text-xs font-bold text-ieee-gray uppercase tracking-wider mb-1">Additional Notes</p>
              <p className="text-sm text-ieee-black leading-relaxed">{inquiry.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-ieee-blue/30 shadow-md relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-ieee-blue" />
          Edit Submission Details
        </h2>
        <button
          onClick={() => setIsEditing(false)}
          className="p-1.5 text-ieee-gray hover:text-ieee-black bg-ieee-gray/5 hover:bg-ieee-gray/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Organization Name *</label>
          <input
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold"
          />
        </div>
        <div className="space-y-1.5 opacity-60">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Work Email (Cannot change)</label>
          <input
            value={inquiry.workEmail}
            disabled
            className="w-full bg-ieee-gray/10 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black font-semibold cursor-not-allowed"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Contact Person *</label>
          <input
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Designation *</label>
          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold"
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Website</label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Partnership Type *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {PARTNERSHIP_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-left ${
                  formData.partnershipTypes.includes(type)
                    ? "border-ieee-blue bg-ieee-blue/5 text-ieee-blue"
                    : "border-ieee-gray/15 text-ieee-gray hover:border-ieee-gray/30"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Collaboration Notes *</label>
          <textarea
            name="collaborationNotes"
            value={formData.collaborationNotes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold resize-none"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={3}
            className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold resize-none"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={() => setIsEditing(false)}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-bold text-sm text-ieee-gray hover:bg-ieee-gray/10 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-ieee-blue hover:bg-ieee-blue/90 shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}
