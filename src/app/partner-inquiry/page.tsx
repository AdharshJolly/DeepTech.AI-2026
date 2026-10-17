import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function PartnerInquiryPage() {
  redirect(
    "https://docs.google.com/forms/d/e/1FAIpQLSeSJYgsH0F8V-gMbVxqWyGW_a5MjInMRFOchwwyAARvSAsGvg/viewform"
  );
}
