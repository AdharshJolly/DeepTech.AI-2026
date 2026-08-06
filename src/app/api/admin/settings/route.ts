import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as unknown as { role: string };
  if (user.role !== "superAdmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user as unknown as { role: string };
  if (user.role !== "superAdmin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const updates = Object.entries(body).map(async ([key, value]) => {
      await SiteSettings.findOneAndUpdate(
        { key },
        { key, value: String(value) },
        { upsert: true, new: true }
      );
    });

    await Promise.all(updates);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
