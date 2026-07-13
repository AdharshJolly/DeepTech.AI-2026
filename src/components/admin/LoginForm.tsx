"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-500 rounded-xl text-sm border border-red-100 font-medium">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-semibold text-ieee-black mb-1">
          Admin Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:outline-none focus:ring-2 focus:ring-ieee-blue transition-all"
          placeholder="admin@ieee.org"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ieee-black mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 rounded-xl border border-ieee-gray/20 focus:outline-none focus:ring-2 focus:ring-ieee-blue transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-ieee-blue text-white font-bold py-3 px-4 rounded-xl hover:bg-ieee-blue/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {loading ? "Authenticating..." : "Sign In"}
      </button>
    </form>
  );
}
