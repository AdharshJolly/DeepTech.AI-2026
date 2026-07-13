import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Calendar } from "lucide-react";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Speakers", href: "/admin/speakers", icon: Users },
    { name: "Committee", href: "/admin/committee", icon: Users },
    { name: "Agenda", href: "/admin/agenda", icon: Calendar },
  ];

  return (
    <div className="h-full w-full bg-ieee-gray/5 flex overflow-hidden">
      {/* Sidebar - Thinner (w-56 instead of w-64) and fixed height */}
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
                {session.user?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-sm font-medium text-ieee-black truncate">
                {session.user?.email?.split("@")[0]}
              </div>
            </div>
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content - Independent Scroll */}
      <main className="flex-1 overflow-y-auto h-full p-4 md:p-8 bg-ieee-gray/5 relative">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
