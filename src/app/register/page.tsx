import type { Metadata } from "next";
import RegistrationForm from "@/components/RegistrationForm";
import { isFeatureEnabled } from "@/lib/featureFlags";
import ComingSoon from "@/components/ComingSoon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Register | DeepTech.AI 2026",
  description:
    "Register for DeepTech.AI 2026 — the flagship IEEE CS event for Physical AI and Robotics at GE Healthcare, Bengaluru.",
};

export default async function RegisterPage() {
  const isEnabled = await isFeatureEnabled("registration");

  if (!isEnabled) {
    return (
      <ComingSoon
        title="Registration"
        message="Registration will open soon. Follow us on social media for the latest updates and be the first to know when spots open!"
      />
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <RegistrationForm />
    </main>
  );
}
