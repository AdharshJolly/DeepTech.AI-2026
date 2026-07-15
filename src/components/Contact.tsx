"use client";

import React, { useState } from "react";
import { MapPin, ChevronRight, Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "General Inquiries",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.warning) {
          setStatus({
            type: "warning",
            text: data.warning,
          });
        } else {
          setStatus({
            type: "success",
            text: "Your message has been successfully recorded in the Google Sheet. Thank you!",
          });
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          enquiryType: "General Inquiries",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          text: data.error || "Failed to submit enquiry. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text: "A connection error occurred. Please check your network and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-transparent relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-orange uppercase mb-4 border border-ieee-orange/30 bg-ieee-orange/5 px-4 py-2 rounded-full">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-heading font-black text-ieee-black tracking-tight mt-4">
            Venue & Enquiry Form
          </h2>
          <p className="text-lg text-ieee-gray mt-6 max-w-2xl mx-auto leading-relaxed">
            Have questions about the summit, registration, or sponsorship
            opportunities? Fill out the form below and we will get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left: Venue & Map */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            {/* Location Card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-ieee-gray/10 shadow-lg group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ieee-cyan/5 rounded-full blur-3xl group-hover:bg-ieee-cyan/15 transition-colors duration-500"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-ieee-cyan/10 border border-ieee-cyan/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-ieee-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ieee-black mb-2">
                    Summit Venue
                  </h3>
                  <p className="text-ieee-gray leading-relaxed mb-4">
                    GE Healthcare JFWTC
                    <br />
                    Whitefield, Bengaluru
                    <br />
                    Karnataka 560066, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=GE+Healthcare+JFWTC+Whitefield+Bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold tracking-widest text-ieee-cyan uppercase hover:text-ieee-orange transition-colors"
                  >
                    Get Directions <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed Card */}
            <div className="bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[2.5rem] border border-ieee-gray/10 shadow-lg overflow-hidden relative flex-1 min-h-60 md:min-h-80">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-ieee-gray/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.914836591106!2d77.72128397455987!3d12.977303814767291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11f4e9762799%3A0xc6fb11df29ea4c7a!2sGE%20Healthcare!5e0!3m2!1sen!2sin!4v1783961758146!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-ieee-gray/10 shadow-2xl relative overflow-hidden">
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-ieee-cyan/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-ieee-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-ieee-black mb-6">Submit an Enquiry</h3>

                {status && (
                  <div
                    className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
                      status.type === "success"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                        : status.type === "warning"
                        ? "bg-amber-50 border-amber-100 text-amber-800"
                        : "bg-rose-50 border-rose-100 text-rose-800"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm font-medium">{status.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-ieee-black mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all text-ieee-black font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ieee-black mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. john@example.com"
                        className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all text-ieee-black font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-ieee-black mb-1.5">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all text-ieee-black font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ieee-black mb-1.5">Type of Enquiry *</label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        required
                        className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all text-ieee-black font-semibold cursor-pointer"
                      >
                        <option value="General Inquiries">General Inquiries</option>
                        <option value="Registrations">Registrations</option>
                        <option value="Sponsorships">Sponsorships & Partnering</option>
                        <option value="Speaker Enquiry">Speaker Enquiry</option>
                        <option value="Media & PR">Media & PR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ieee-black mb-1.5">Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Type your message here..."
                      className="w-full p-3.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:bg-white transition-all text-ieee-black font-medium resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-ieee-blue text-white rounded-2xl py-4 px-6 font-bold hover:bg-ieee-blue/95 transition-all shadow-lg hover:shadow-ieee-blue/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {submitting ? "Sending Request..." : "Send Enquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
