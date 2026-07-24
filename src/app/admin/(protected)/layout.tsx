import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Handshake,
  ToggleLeft,
  Share2,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import SignOutButton from "@/components/admin/SignOutButton";

const allNavItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, section: null },
  { name: "Speakers", href: "/admin/speakers", icon: Users, section: "speakers" },
  { name: "Committee", href: "/admin/committee", icon: Users, section: "committee" },
  { name: "Agenda", href: "/admin/agenda", icon: Calendar, section: "agenda" },
  { name: "Partners", href: "/admin/partners", icon: Handshake, section: "partners" },
  { name: "Social Claims", href: "/admin/social", icon: Share2, section: "social" },
  { name: "Registrations", href: "/admin/registrations", icon: UserCheck, section: "registrations" },
  { name: "Feature Flags", href: "/admin/feature-flags", icon: ToggleLeft, section: "feature-flags" },
  { name: "Users", href: "/admin/users", icon: ShieldCheck, section: "users" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const user = session.user as unknown as {
    role: string;
    permissions?: { section: string; actions: string[] }[];
    mustChangePassword?: boolean;
  };

  // Force password change before accessing anything else
  if (user.mustChangePassword) {
    redirect("/admin/change-password");
  }

  // Filter nav items based on permissions
  const navItems = allNavItems.filter((item) => {
    // Dashboard is always visible
    if (!item.section) return true;
    // SuperAdmin sees everything
    if (user.role === "superAdmin") return true;
    // Check if user has read permission for this section
    return (user.permissions || []).some(
      (p) => p.section === item.section && p.actions.includes("read")
    );
  });

  return (
    <div className="h-full w-full bg-ieee-gray/5 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-ieee-gray/10 flex-col hidden md:flex h-full shadow-[2px_0_10px_rgba(0,0,0,0.02)] relative z-10">
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-ieee-gray hover:text-ieee-blue hover:bg-ieee-cyan/10 rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ieee-gray/10 bg-ieee-gray/5">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 shrink-0 rounded-full bg-ieee-blue/10 flex items-center justify-center text-ieee-blue font-bold text-sm">
                {session.user?.name?.charAt(0).toUpperCase() ||
                  session.user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-medium text-ieee-black truncate">
                  {session.user?.name || session.user?.email?.split("@")[0]}
                </div>
                <div className="text-xs text-ieee-gray capitalize">
                  {user.role === "superAdmin" ? "SuperAdmin" : "Admin"}
                </div>
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full p-4 md:p-8 bg-ieee-gray/5 relative">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
