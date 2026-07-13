import { LogOut } from "lucide-react";
import Link from "next/link";

export default function SignOutButton() {
  return (
    <Link
      href="/api/auth/signout"
      className="p-2 text-ieee-gray hover:text-red-500 transition-colors ml-auto rounded-full hover:bg-red-50"
      title="Sign Out"
    >
      <LogOut className="w-5 h-5" />
    </Link>
  );
}
