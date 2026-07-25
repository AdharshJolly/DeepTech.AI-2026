import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;

export async function GET() {
  // Only require authentication, not specific permissions
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }

  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }

  try {
    const url = `${APPS_SCRIPT_URL}?action=getQuota&secret=${EMAIL_SECRET}`;
    const res = await fetch(url);
    const text = await res.text();

    // Parse JSON from response
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }
}
