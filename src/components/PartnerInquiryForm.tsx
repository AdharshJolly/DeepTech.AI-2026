"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Handshake,
  Loader2,
  X,
  Lock,
} from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

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

interface FormErrors {
  [key: string]: string | undefined;
}

export default function PartnerInquiryForm() {
  const [organizationName, setOrganizationName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [partnershipTypes, setPartnershipTypes] = useState<string[]>([]);
  const [collaborationNotes, setCollaborationNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const toggleType = (type: string) => {
    setPartnershipTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setErrors((prev) => ({ ...prev, partnershipTypes: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!organizationName.trim())
      newErrors.organizationName = "Organization name is required";
    if (!contactPerson.trim())
      newErrors.contactPerson = "Contact person is required";
    if (!workEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail))
      newErrors.workEmail = "Valid email is required";
    if (!designation.trim()) newErrors.designation = "Designation is required";
    if (partnershipTypes.length === 0)
      newErrors.partnershipTypes = "Select at least one partnership type";
    if (!collaborationNotes.trim())
      newErrors.collaborationNotes = "Please tell us about your collaboration";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowPasswordModal(true);
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
    setServerError(null);

    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName,
          contactPerson,
          workEmail,
          designation,
          partnershipTypes,
          collaborationNotes,
          website,
          additionalNotes,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        gaEvent({
          action: "partner_inquiry",
          category: "Partners",
          label: organizationName,
        });
        setShowPasswordModal(false);
        setShowSuccess(true);
      } else {
        setServerError(data.error || "Failed to submit inquiry");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-ieee-black mb-4">
          Thank you for reaching out!
        </h2>
        <p className="text-ieee-gray text-lg leading-relaxed mb-6">
          We&apos;ve received your partnership inquiry. Our team will review your
          submission and get back to you within{" "}
          <strong className="text-ieee-black">3-5 business days</strong> to
          discuss potential collaboration opportunities.
        </p>
        <div className="bg-ieee-blue/5 border border-ieee-blue/15 rounded-2xl p-4 text-sm text-ieee-gray">
          A confirmation email has been sent to{" "}
          <strong className="text-ieee-black">{workEmail}</strong>.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative">
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
            
            <div className="w-12 h-12 bg-ieee-blue/10 rounded-full flex items-center justify-center mb-6 text-ieee-blue">
              <Lock className="w-6 h-6" />
            </div>
            
            <h3 className="text-2xl font-bold font-heading text-ieee-black mb-2">
              Set your Password
            </h3>
            <p className="text-ieee-gray text-sm mb-6 leading-relaxed">
              Create a password to easily check the status of your partnership inquiry later.
            </p>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              {passwordError && (
                <div className="p-3 rounded-xl flex items-center gap-2 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {passwordError}
                </div>
              )}
              {serverError && (
                <div className="p-3 rounded-xl flex items-center gap-2 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {serverError}
                </div>
              )}
              
              <Field
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Minimum 6 characters"
              />
              <Field
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Re-enter password"
              />

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

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-ieee-orange/10 text-ieee-orange px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Handshake className="w-3.5 h-3.5" />
          Partner with Us
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-ieee-black tracking-tight mb-4">
          Partner with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
            DeepTech.AI
          </span>
        </h1>
        <p className="text-ieee-gray font-medium max-w-xl mx-auto">
          Thank you for your interest in partnering with DeepTech.AI. Please
          share a few details about your organization, and our partnerships
          team will get in touch to discuss collaboration opportunities.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-ieee-gray/10 shadow-sm">
        {serverError && (
          <div className="p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleInitialSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Organization Name"
              value={organizationName}
              onChange={setOrganizationName}
              placeholder="Your company name"
              error={errors.organizationName}
            />
            <Field
              label="Contact Person"
              value={contactPerson}
              onChange={setContactPerson}
              placeholder="Full name"
              error={errors.contactPerson}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Work Email"
              value={workEmail}
              onChange={setWorkEmail}
              placeholder="you@company.com"
              type="email"
              error={errors.workEmail}
            />
            <Field
              label="Designation"
              value={designation}
              onChange={setDesignation}
              placeholder="e.g. Partnerships Lead, Marketing Manager"
              error={errors.designation}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Partnership Type *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PARTNERSHIP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    partnershipTypes.includes(type)
                      ? "border-ieee-blue bg-ieee-blue/5 text-ieee-blue"
                      : "border-ieee-gray/15 text-ieee-gray hover:border-ieee-gray/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.partnershipTypes && (
              <p className="text-xs text-red-500 font-medium">
                {errors.partnershipTypes}
              </p>
            )}
          </div>

          <TextArea
            label="Tell us about your organization and collaboration interests"
            value={collaborationNotes}
            onChange={setCollaborationNotes}
            placeholder="Briefly describe your organization and how you'd like to collaborate with DeepTech.AI 2026..."
            error={errors.collaborationNotes}
          />

          <Field
            label="Organization Website or LinkedIn (Optional)"
            value={website}
            onChange={setWebsite}
            placeholder="https://yourcompany.com or LinkedIn URL"
          />

          <TextArea
            label="Anything else you'd like us to know? (Optional)"
            value={additionalNotes}
            onChange={setAdditionalNotes}
            placeholder="Any additional information..."
          />

            <button
              type="submit"
              className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
            >
              <>
                <Send className="w-4 h-4" />
                Submit Inquiry
              </>
            </button>
          </form>
        </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
        {label} *
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold transition-all ${
          error ? "border-red-400" : "border-ieee-gray/10"
        }`}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
        {label} *
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-semibold resize-none transition-all ${
          error ? "border-red-400" : "border-ieee-gray/10"
        }`}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
