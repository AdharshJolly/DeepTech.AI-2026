import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import PartnerInquiry from "@/models/PartnerInquiry";
import { Activity, FileText } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import PartnerDetailsEditor from "@/components/PartnerDetailsEditor";

export default async function PartnerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "partner") {
    redirect("/admin/login");
  }

  await connectToDatabase();
  const rawInquiry = await PartnerInquiry.findOne({
    workEmail: session.user.email,
  }).lean();

  if (!rawInquiry) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <p>Inquiry not found.</p>
      </div>
    );
  }

  // Serialize the mongoose document for client components
  const inquiry = JSON.parse(JSON.stringify(rawInquiry));

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
  };

  const statusColor = statusColors[inquiry.status as keyof typeof statusColors] || statusColors.pending;

  return (
    <main className="min-h-screen bg-ieee-gray/5 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-heading text-ieee-black tracking-tight">
              Partner Dashboard
            </h1>
            <p className="text-ieee-gray font-medium mt-1">
              Welcome back, {inquiry.contactPerson} ({inquiry.organizationName})
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-ieee-gray/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2">
              <Activity className="w-5 h-5 text-ieee-blue" />
              Application Status
            </h2>
            <p className="text-sm text-ieee-gray">
              Here is the current status of your partnership inquiry.
            </p>
          </div>
          <div className={`px-6 py-2.5 rounded-full border text-sm font-bold uppercase tracking-wider ${statusColor}`}>
            {inquiry.status}
          </div>
        </div>

        {/* Admin Feedback */}
        {inquiry.adminFeedback && (
          <div className="bg-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100 shadow-sm">
            <div className="space-y-1 mb-4">
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Message from DeepTech.AI Team
              </h2>
            </div>
            <div className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
              {inquiry.adminFeedback}
            </div>
          </div>
        )}

        {/* Submission Details */}
        <PartnerDetailsEditor inquiry={inquiry} />

      </div>
    </main>
  );
}
