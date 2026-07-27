import type { Metadata } from "next";
import PartnerInquiryForm from "@/components/PartnerInquiryForm";
import { isFeatureEnabled } from "@/lib/featureFlags";
import ComingSoon from "@/components/ComingSoon";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner with Us | DeepTech.AI 2026",
  description:
    "Partner with IEEE CS Bangalore Chapter for DeepTech.AI 2026 — sponsorship, technology, community, and more.",
};

export default async function PartnerInquiryPage() {
  const isEnabled = await isFeatureEnabled("partner-inquiry");

  if (!isEnabled) {
    return (
      <ComingSoon
        title="Partner Inquiry"
        message="Our partnership opportunities are being finalized. Stay tuned for exciting collaboration options!"
      />
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <PartnerInquiryForm />
    </main>
  );
}
