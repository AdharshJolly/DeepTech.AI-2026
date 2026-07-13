import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ieee-gray/5 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-ieee-gray/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-black text-ieee-blue">
            DeepTech<span className="text-ieee-orange">.ai</span> Admin
          </h1>
          <p className="text-ieee-gray mt-2">Sign in to manage the platform</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
