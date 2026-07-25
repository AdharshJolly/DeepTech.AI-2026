import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;
const EMAIL_SECRET = process.env.GOOGLE_APPS_SCRIPT_SECRET;

export async function GET() {
  const { error } = await requirePermission("feature-flags", "read");
  if (error) return error;

  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }

  try {
    const url = `${APPS_SCRIPT_URL}?action=getQuota&secret=${EMAIL_SECRET}`;
    const res = await fetch(url);
    const text = await res.text();

    // Apps Script returns HTML wrapper around JSON, extract the JSON
    const jsonMatch = text.match(/\{.*\}/s);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return NextResponse.json(data);
    }

    return NextResponse.json({ quota: 100, remaining: 100 });
  } catch {
    return NextResponse.json({ quota: 100, remaining: 100 });
  }
}
