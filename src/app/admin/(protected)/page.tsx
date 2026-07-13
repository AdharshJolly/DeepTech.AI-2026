import connectToDatabase from "@/lib/db";
import Speaker from "@/models/Speaker";
import Committee from "@/models/Committee";
import Agenda from "@/models/Agenda";
import { Users, Calendar, Activity } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  await connectToDatabase();

  const speakersCount = await Speaker.countDocuments();
  const committeeCount = await Committee.countDocuments();
  const agendaCount = await Agenda.countDocuments();

  const stats = [
    { name: "Total Speakers", value: speakersCount, icon: Users, color: "text-ieee-orange", bg: "bg-ieee-orange/10", href: "/admin/speakers" },
    { name: "Committee Members", value: committeeCount, icon: Users, color: "text-ieee-blue", bg: "bg-ieee-blue/10", href: "/admin/committee" },
    { name: "Agenda Sessions", value: agendaCount, icon: Calendar, color: "text-ieee-cyan", bg: "bg-ieee-cyan/10", href: "/admin/agenda" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Dashboard Overview</h1>
      <p className="text-ieee-gray mb-8">Welcome to the DeepTech.ai 2026 Admin Panel.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href} className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-3xl font-bold text-ieee-black mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-ieee-gray">{stat.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-ieee-gray/10 shadow-sm flex flex-col items-center justify-center text-center py-16">
        <Activity className="w-16 h-16 text-ieee-gray/20 mb-4" />
        <h2 className="text-2xl font-bold text-ieee-black mb-2">System Running Smoothly</h2>
        <p className="text-ieee-gray max-w-md mx-auto">
          All Next.js Server Components are dynamically connected to your MongoDB Atlas cluster. Navigate through the sidebar to manage your event data in real-time.
        </p>
      </div>
    </div>
  );
}
