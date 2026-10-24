import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EmailSender from "@/components/admin/EmailSender";
import EmailQuotaWidget from "@/components/admin/EmailQuotaWidget";

export const metadata = {
  title: "Send Email | Admin DeepTech.AI",
};

export default async function AdminEmailPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as unknown as { role: string } | undefined;
  if (user?.role !== "superAdmin") redirect("/admin");

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-ieee-black mb-2">Send Email</h1>
        <p className="text-ieee-gray">
          Send a registration confirmation or custom message to a list of addresses through the Google Apps Script mailer.
        </p>
      </div>

      <div className="max-w-sm">
        <EmailQuotaWidget />
      </div>

      <EmailSender />
    </div>
  );
}
