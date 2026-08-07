import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import SocialUser from "@/models/SocialUser";
import SocialSubmission from "@/models/SocialSubmission";
import { Zap, Activity, CheckCircle, Clock, XCircle, Share2 } from "lucide-react";
import SignOutButton from "@/components/admin/SignOutButton";
import { QUESTS } from "@/config/quests";
import Link from "next/link";

export default async function SocialDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "socialUser") {
    redirect("/login");
  }

  await connectToDatabase();
  const user = await SocialUser.findOne({
    email: session.user.email,
  }).lean();

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center">
        <p>Account not found.</p>
      </div>
    );
  }

  const submissions = await SocialSubmission.find({ email: session.user.email }).sort({ createdAt: -1 }).lean();

  // Aggregate points
  const totalApprovedPoints = submissions
    .filter(s => s.status === "approved")
    .reduce((sum, s) => sum + s.points, 0);

  const pendingPoints = submissions
    .filter(s => s.status === "pending")
    .reduce((sum, s) => sum + s.points, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "pending": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "rejected": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Approved</span>;
      case "pending": return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Pending</span>;
      case "rejected": return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">Rejected</span>;
      default: return null;
    }
  };

  const getQuestTitle = (id: string) => {
    return QUESTS.find(q => q.id === id)?.title || id;
  };

  return (
    <main className="min-h-screen bg-ieee-gray/5 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black font-heading text-ieee-black tracking-tight flex items-center gap-2">
              <Share2 className="w-8 h-8 text-ieee-cyan" />
              Social Dashboard
            </h1>
            <p className="text-ieee-gray font-medium mt-1">
              Welcome back, {user.socialHandle} ({user.email})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/social-hub"
              className="px-4 py-2 bg-white text-ieee-blue text-sm font-bold rounded-xl border border-ieee-blue/20 hover:bg-ieee-blue/5 transition-colors"
            >
              Submit New Post
            </Link>
            <SignOutButton />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-ieee-orange" />
              <h3 className="text-sm font-bold text-ieee-gray uppercase tracking-wider">Total Points</h3>
            </div>
            <p className="text-4xl font-black text-ieee-black">{totalApprovedPoints}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <h3 className="text-sm font-bold text-ieee-gray uppercase tracking-wider">Pending Points</h3>
            </div>
            <p className="text-4xl font-black text-ieee-black">{pendingPoints}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-ieee-cyan" />
              <h3 className="text-sm font-bold text-ieee-gray uppercase tracking-wider">Total Claims</h3>
            </div>
            <p className="text-4xl font-black text-ieee-black">{submissions.length}</p>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-ieee-gray/10 shadow-sm">
          <h2 className="text-lg font-bold text-ieee-black flex items-center gap-2 mb-6">
            <Share2 className="w-5 h-5 text-ieee-blue" />
            Your Social Claims
          </h2>
          
          {submissions.length === 0 ? (
            <div className="text-center py-10 bg-ieee-gray/5 rounded-2xl border border-ieee-gray/10">
              <Share2 className="w-10 h-10 text-ieee-gray/40 mx-auto mb-3" />
              <p className="text-ieee-black font-semibold">No claims submitted yet.</p>
              <Link href="/social-hub" className="text-sm text-ieee-blue font-bold hover:underline mt-1 block">
                Go to the Social Hub to complete a quest!
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub: { _id: string; status: string; questId: string; postUrl: string; points: number }) => (
                <div key={sub._id.toString()} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-ieee-gray/10 hover:border-ieee-gray/20 transition-colors bg-ieee-gray/5">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(sub.status)}
                      <h3 className="font-bold text-ieee-black">{getQuestTitle(sub.questId)}</h3>
                    </div>
                    <a 
                      href={sub.postUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-ieee-cyan hover:underline break-all block ml-7"
                    >
                      {sub.postUrl}
                    </a>
                  </div>
                  <div className="flex items-center gap-4 ml-7 md:ml-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-ieee-gray uppercase mb-1">Points</p>
                      <p className="font-bold text-ieee-black">+{sub.points}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-ieee-gray uppercase mb-1">Status</p>
                      {getStatusBadge(sub.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
