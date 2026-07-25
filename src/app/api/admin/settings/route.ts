import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  const { error } = await requirePermission("feature-flags", "read");
  if (error) return error;

  try {
    await connectToDatabase();
    const settings = await SiteSettings.find();
    const result: Record<string, string> = {};
    settings.forEach((s) => (result[s.key] = s.value));
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { error } = await requirePermission("feature-flags", "update");
  if (error) return error;

  try {
    await connectToDatabase();
    const { key, value } = await req.json();

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
    }

    await SiteSettings.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
