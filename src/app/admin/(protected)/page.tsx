import connectToDatabase from "@/lib/db";
import Speaker from "@/models/Speaker";
import Committee from "@/models/Committee";
import Agenda from "@/models/Agenda";
import Registration from "@/models/Registration";
import PartnerInquiry from "@/models/PartnerInquiry";
import { Users, Calendar, UserCheck, Handshake, Activity } from "lucide-react";
import Link from "next/link";
import EmailQuotaWidget from "@/components/admin/EmailQuotaWidget";

export default async function AdminDashboard() {
  await connectToDatabase();

  const speakersCount = await Speaker.countDocuments();
  const committeeCount = await Committee.countDocuments();
  const agendaCount = await Agenda.countDocuments();
  const registrationsCount = await Registration.countDocuments();
  const pendingRegistrations = await Registration.countDocuments({ status: "pending" });
  const partnerInquiriesCount = await PartnerInquiry.countDocuments();
  const pendingInquiries = await PartnerInquiry.countDocuments({ status: "pending" });

  const stats = [
    { name: "Speakers", value: speakersCount, icon: Users, color: "text-ieee-orange", bg: "bg-ieee-orange/10", href: "/admin/speakers" },
    { name: "Committee", value: committeeCount, icon: Users, color: "text-ieee-blue", bg: "bg-ieee-blue/10", href: "/admin/committee" },
    { name: "Agenda Sessions", value: agendaCount, icon: Calendar, color: "text-ieee-cyan", bg: "bg-ieee-cyan/10", href: "/admin/agenda" },
    { name: "Registrations", value: registrationsCount, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/registrations", badge: pendingRegistrations > 0 ? `${pendingRegistrations} pending` : undefined },
    { name: "Partner Inquiries", value: partnerInquiriesCount, icon: Handshake, color: "text-amber-600", bg: "bg-amber-50", href: "/admin/partner-inquiries", badge: pendingInquiries > 0 ? `${pendingInquiries} pending` : undefined },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Dashboard Overview</h1>
      <p className="text-ieee-gray mb-8">Welcome to the DeepTech.AI 2026 Admin Panel.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href} className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                {stat.badge && (
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    {stat.badge}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-ieee-black mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-ieee-gray">{stat.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmailQuotaWidget />

        <div className="bg-white p-6 rounded-3xl border border-ieee-gray/10 shadow-sm flex flex-col items-center justify-center text-center">
          <Activity className="w-12 h-12 text-ieee-gray/20 mb-4" />
          <h2 className="text-lg font-bold text-ieee-black mb-2">System Running Smoothly</h2>
          <p className="text-sm text-ieee-gray max-w-sm mx-auto">
            All services are connected and operational. Navigate through the sidebar to manage your event.
          </p>
        </div>
      </div>
    </div>
  );
}
