import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Register | DeepTech.AI 2026",
  description:
    "Register for DeepTech.AI 2026 — the flagship IEEE CS event for Physical AI and Robotics at GE Healthcare, Bengaluru.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-ieee-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <RegistrationForm />
    </main>
  );
}
