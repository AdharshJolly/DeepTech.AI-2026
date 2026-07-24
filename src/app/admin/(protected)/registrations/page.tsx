"use client";

import { useState, useEffect } from "react";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Loader2,
  Search,
} from "lucide-react";

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  whyAttend: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

type FilterTab = "all" | "pending" | "approved" | "rejected";

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/registrations");
        if (res.ok) {
          setRegistrations(await res.json());
        }
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
      const res = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status } : r))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = registrations.filter((r) => {
    const matchesTab = activeTab === "all" || r.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    all: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    approved: registrations.filter((r) => r.status === "approved").length,
    rejected: registrations.filter((r) => r.status === "rejected").length,
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-ieee-blue/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-ieee-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-ieee-black">
            Registrations
          </h1>
          <p className="text-sm text-ieee-gray">
            Manage attendee registrations for DeepTech.AI 2026
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
            placeholder="Search name, email, org..."
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
          <Users className="w-12 h-12 text-ieee-gray/30 mx-auto mb-4" />
          <p className="text-ieee-gray font-semibold">
            No registrations found
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-ieee-gray/10 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ieee-gray/5 border-b border-ieee-gray/10">
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider hidden md:table-cell">
                  Organization
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider hidden lg:table-cell">
                  Job Title
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-xs font-bold text-ieee-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr
                  key={reg._id}
                  className="border-b border-ieee-gray/5 hover:bg-ieee-gray/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-ieee-black">
                      {reg.fullName}
                    </div>
                    <div className="text-xs text-ieee-gray flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" /> {reg.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-ieee-black font-medium">
                      {reg.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="text-sm text-ieee-gray">
                      {reg.jobTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={reg.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-ieee-gray">
                      {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === reg._id ? null : reg._id
                          )
                        }
                        className="px-3 py-1.5 text-xs font-bold text-ieee-blue bg-ieee-blue/10 rounded-lg hover:bg-ieee-blue/20 transition-colors"
                      >
                        {expandedId === reg._id ? "Hide" : "View"}
                      </button>
                      {reg.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg._id, "approved")
                            }
                            disabled={updatingId === reg._id}
                            className="p-1.5 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors disabled:opacity-50"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(reg._id, "rejected")
                            }
                            disabled={updatingId === reg._id}
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

          {/* Expanded Detail Row */}
          {expandedId && (
            <ExpandedRow
              registration={registrations.find((r) => r._id === expandedId)!}
            />
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:
      "bg-amber-100 text-amber-700 border-amber-200",
    approved:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected:
      "bg-rose-100 text-rose-700 border-rose-200",
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

function ExpandedRow({ registration: reg }: { registration: Registration }) {
  return (
    <div className="px-6 py-6 bg-ieee-gray/5 border-t border-ieee-gray/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider">
            Contact Information
          </h4>
          <div className="space-y-2">
            <DetailRow icon={Mail} label="Email" value={reg.email} />
            <DetailRow icon={Phone} label="Phone" value={reg.phone || "Not provided"} />
            <DetailRow icon={Building2} label="Organization" value={reg.organization} />
            <DetailRow icon={Briefcase} label="Job Title" value={reg.jobTitle} />
          </div>
        </div>

        {/* Why Attend */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-ieee-black uppercase tracking-wider">
            Why Attend?
          </h4>
          <div className="bg-white rounded-2xl p-4 border border-ieee-gray/10">
            <p className="text-sm text-ieee-gray leading-relaxed">
              {reg.whyAttend}
            </p>
          </div>
          <div className="text-xs text-ieee-gray">
            Registered on{" "}
            {new Date(reg.createdAt).toLocaleDateString("en-IN", {
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
