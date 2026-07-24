"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Calendar,
  MapPin,
  Loader2,
  X,
} from "lucide-react";
import { event as gaEvent } from "@/lib/analytics";

interface FormErrors {
  fullName?: string;
  email?: string;
  organization?: string;
  jobTitle?: string;
  whyAttend?: string;
}

export default function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [whyAttend, setWhyAttend] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!organization || organization.trim().length < 2) {
      newErrors.organization = "Please enter your organization";
    }
    if (!jobTitle || jobTitle.trim().length < 2) {
      newErrors.jobTitle = "Please enter your job title";
    }
    if (!whyAttend || whyAttend.trim().length < 10) {
      newErrors.whyAttend = "Please tell us why you want to attend (min 10 characters)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          organization,
          jobTitle,
          whyAttend,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        gaEvent({
          action: "registration",
          category: "Registration",
          label: email,
        });
        setShowSuccess(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setOrganization("");
        setJobTitle("");
        setWhyAttend("");
        setErrors({});
      } else {
        setServerError(data.error || "Failed to register. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Event Info Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-ieee-orange/10 text-ieee-orange px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Calendar className="w-3.5 h-3.5" />
          Free Registration
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-ieee-black tracking-tight mb-4">
          Register for{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-ieee-blue to-ieee-cyan">
            DeepTech.AI 2026
          </span>
        </h1>
        <p className="text-ieee-gray font-medium">
          Secure your spot at the flagship IEEE CS Physical AI summit.
        </p>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-ieee-gray">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-ieee-blue" />
            Oct 30, 2026
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-ieee-orange" />
            GE Healthcare, Bengaluru
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-ieee-gray/10 shadow-sm">
        {serverError && (
          <div className="p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all ${
                  errors.fullName ? "border-red-400" : "border-ieee-gray/10"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all ${
                  errors.email ? "border-red-400" : "border-ieee-gray/10"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Organization / Company *
              </label>
              <input
                type="text"
                placeholder="IEEE, Google, etc."
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  setErrors((prev) => ({ ...prev, organization: undefined }));
                }}
                className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all ${
                  errors.organization ? "border-red-400" : "border-ieee-gray/10"
                }`}
              />
              {errors.organization && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.organization}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Job Title / Role *
              </label>
              <input
                type="text"
                placeholder="Software Engineer, Researcher, etc."
                value={jobTitle}
                onChange={(e) => {
                  setJobTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, jobTitle: undefined }));
                }}
                className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all ${
                  errors.jobTitle ? "border-red-400" : "border-ieee-gray/10"
                }`}
              />
              {errors.jobTitle && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.jobTitle}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-ieee-black uppercase tracking-wider">
              Why do you want to attend DeepTech.AI 2026? *
            </label>
            <textarea
              placeholder="Tell us about your goals — networking, learning about Physical AI, exploring partnerships, career opportunities, etc."
              value={whyAttend}
              onChange={(e) => {
                setWhyAttend(e.target.value);
                setErrors((prev) => ({ ...prev, whyAttend: undefined }));
              }}
              rows={4}
              className={`w-full bg-ieee-gray/5 border rounded-2xl px-4 py-3.5 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all resize-none ${
                errors.whyAttend ? "border-red-400" : "border-ieee-gray/10"
              }`}
            />
            {errors.whyAttend && (
              <p className="text-xs text-red-500 font-medium">
                {errors.whyAttend}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-ieee-blue to-ieee-cyan text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Register Now
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-ieee-gray mt-6">
          By registering, you agree to receive event-related communications from
          IEEE Computer Society Bangalore Chapter.
        </p>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative bg-white rounded-3xl p-8 md:p-10 max-w-lg w-full shadow-2xl text-center">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-ieee-gray/10 transition-colors"
            >
              <X className="w-5 h-5 text-ieee-gray" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-ieee-black mb-3">
              Response Recorded!
            </h3>

            <p className="text-ieee-gray text-sm leading-relaxed mb-4">
              Thank you for registering for DeepTech.AI 2026.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-sm text-amber-800">
              <p>
                Please note that submitting this form does{" "}
                <strong>not</strong> mean confirmed access to the event.
                Selected participants will be informed via email regarding
                further information.
              </p>
            </div>

            <p className="text-xs text-ieee-gray mb-6">
              We look forward to seeing you at GE Healthcare, Bengaluru on{" "}
              <strong className="text-ieee-black">October 30, 2026</strong>.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-ieee-blue hover:bg-ieee-blue/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
