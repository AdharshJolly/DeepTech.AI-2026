import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;

export async function GET() {
  const { error } = await requirePermission("feature-flags", "read");
  if (error) return error;

  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ quota: 100, remaining: 100, error: "Email service not configured" });
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: EMAIL_SECRET, action: "getQuota" }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ quota: 100, remaining: 100, error: "Failed to fetch quota" });
  }
}
