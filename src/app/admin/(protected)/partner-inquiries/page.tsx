"use client";

import { useState, useEffect } from "react";
import {
  Handshake,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Building2,
  Briefcase,
  Globe,
  Loader2,
  Search,
} from "lucide-react";

interface PartnerInquiry {
  _id: string;
  organizationName: string;
  contactPerson: string;
  workEmail: string;
  designation: string;
  partnershipTypes: string[];
  collaborationNotes: string;
  website: string;
  additionalNotes: string;
  adminFeedback?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

type FilterTab = "all" | "pending" | "approved" | "rejected";

export default function AdminPartnerInquiriesPage() {
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/partner-inquiries");
        if (res.ok) setInquiries(await res.json());
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/partner-inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i._id === id ? { ...i, status } : i))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateFeedback = async (id: string, adminFeedback: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/partner-inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminFeedback }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i._id === id ? { ...i, adminFeedback } : i))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = inquiries.filter((i) => {
    const matchesTab = activeTab === "all" || i.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      i.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.workEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    approved: inquiries.filter((i) => i.status === "approved").length,
    rejected: inquiries.filter((i) => i.status === "rejected").length,
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-ieee-orange/10 flex items-center justify-center">
          <Handshake className="w-5 h-5 text-ieee-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-ieee-black">
            Partner Inquiries
          </h1>
          <p className="text-sm text-ieee-gray">
            Manage partnership inquiries for DeepTech.AI 2026
          </p>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.key
                  ? "bg-ieee-blue text-white shadow-md"
                  : "bg-ieee-gray/5 text-ieee-gray hover:bg-ieee-gray/10"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${
                  activeTab === tab.key ? "text-white/70" : "text-ieee-gray/50"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ieee-gray" />
          <input
            type="text"
            placeholder="Search org, contact, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-ieee-gray/5 border border-ieee-gray/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ieee-blue"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-ieee-blue animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-ieee-gray/10">
          <Handshake className="w-12 h-12 text-ieee-gray/30 mx-auto mb-4" />
          <p className="text-ieee-gray font-semibold">
            No partner inquiries found
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-ieee-gray/10 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ieee-gray/5 border-b border-ieee-gray/10">
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Organization
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider hidden md:table-cell">
                  Contact
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider hidden lg:table-cell">
                  Partnership Type
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inquiry) => (
                <tr
                  key={inquiry._id}
                  className="border-b border-ieee-gray/5 hover:bg-ieee-gray/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-ieee-black">
                      {inquiry.organizationName}
                    </div>
                    <div className="text-xs text-ieee-gray flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" /> {inquiry.workEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-ieee-black font-medium">
                      {inquiry.contactPerson}
                    </div>
                    <div className="text-xs text-ieee-gray">
                      {inquiry.designation}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {inquiry.partnershipTypes.slice(0, 2).map((type) => (
                        <span
                          key={type}
                          className="text-xs font-medium text-ieee-gray bg-ieee-gray/10 px-2 py-0.5 rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                      {inquiry.partnershipTypes.length > 2 && (
                        <span className="text-xs text-ieee-gray">
                          +{inquiry.partnershipTypes.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inquiry.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === inquiry._id ? null : inquiry._id
                          )
                        }
                        className="px-3 py-1.5 text-xs font-bold text-ieee-blue bg-ieee-blue/10 rounded-lg hover:bg-ieee-blue/20 transition-colors"
                      >
                        {expandedId === inquiry._id ? "Hide" : "View"}
                      </button>
                      {inquiry.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(inquiry._id, "approved")
                            }
                            disabled={updatingId === inquiry._id}
                            className="p-1.5 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(inquiry._id, "rejected")
                            }
                            disabled={updatingId === inquiry._id}
                            className="p-1.5 text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Expanded Detail */}
          {expandedId && (
            <ExpandedRow
              inquiry={inquiries.find((i) => i._id === expandedId)!}
              onUpdateFeedback={handleUpdateFeedback}
              isUpdating={updatingId === expandedId}
            />
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
  };
  const icons: Record<string, typeof Clock> = {
    pending: Clock,
    approved: CheckCircle,
    rejected: XCircle,
  };
  const Icon = icons[status] || Clock;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
        styles[status] || styles.pending
      }`}
    >
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function ExpandedRow({ 
  inquiry, 
  onUpdateFeedback,
  isUpdating 
}: { 
  inquiry: PartnerInquiry;
  onUpdateFeedback: (id: string, feedback: string) => void;
  isUpdating: boolean;
}) {
  const [feedback, setFeedback] = useState(inquiry.adminFeedback || "");

  return (
    <div className="px-6 py-6 bg-ieee-gray/5 border-t border-ieee-gray/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider">
            Contact Information
          </h4>
          <div className="space-y-2">
            <DetailRow icon={Building2} label="Organization" value={inquiry.organizationName} />
            <DetailRow icon={Mail} label="Email" value={inquiry.workEmail} />
            <DetailRow icon={Briefcase} label="Contact" value={`${inquiry.contactPerson} — ${inquiry.designation}`} />
            {inquiry.website && (
              <DetailRow icon={Globe} label="Website" value={inquiry.website} />
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {inquiry.partnershipTypes.map((type) => (
              <span
                key={type}
                className="text-xs font-bold text-ieee-blue bg-ieee-blue/10 px-2.5 py-1 rounded-full"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider">
            Collaboration Notes
          </h4>
          <div className="bg-white rounded-2xl p-4 border border-ieee-gray/10">
            <p className="text-sm text-ieee-gray leading-relaxed">
              {inquiry.collaborationNotes}
            </p>
          </div>
          {inquiry.additionalNotes && (
            <>
              <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider">
                Additional Notes
              </h4>
              <div className="bg-white rounded-2xl p-4 border border-ieee-gray/10">
                <p className="text-sm text-ieee-gray leading-relaxed">
                  {inquiry.additionalNotes}
                </p>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-ieee-gray/10 mt-4">
            <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider mb-2">
              Admin Feedback (Visible to Partner)
            </h4>
            <div className="space-y-2">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter feedback or updates for the partner..."
                rows={3}
                className="w-full bg-white border border-ieee-gray/20 rounded-xl px-4 py-3 text-sm text-ieee-black focus:outline-none focus:ring-2 focus:ring-ieee-blue font-medium resize-none transition-all"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => onUpdateFeedback(inquiry._id, feedback)}
                  disabled={isUpdating || feedback === (inquiry.adminFeedback || "")}
                  className="px-4 py-2 bg-ieee-blue text-white text-xs font-bold rounded-xl hover:bg-ieee-blue/90 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                  Save Feedback
                </button>
              </div>
            </div>
          </div>

          <div className="text-xs text-ieee-gray mt-4">
            Submitted on{" "}
            {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="w-4 h-4 text-ieee-gray shrink-0" />
      <span className="text-ieee-gray">{label}:</span>
      <span className="text-ieee-black font-medium">{value}</span>
    </div>
  );
}
