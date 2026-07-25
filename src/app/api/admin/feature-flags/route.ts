import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import FeatureFlag from "@/models/FeatureFlag";

const FLAGS = [
  "speakers",
  "agenda",
  "registration",
  "social-hub",
  "committee",
  "past-events",
  "email-notifications",
  "partner-inquiry",
];

export async function GET() {
  const { error } = await requirePermission("feature-flags", "read");
  if (error) return error;

  try {
    await connectToDatabase();

    for (const key of FLAGS) {
      const exists = await FeatureFlag.findOne({ key });
      if (!exists) {
        await FeatureFlag.create({ key, enabled: false });
      }
    }

    const flags = await FeatureFlag.find();
    return NextResponse.json(flags);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { error } = await requirePermission("feature-flags", "update");
  if (error) return error;

  try {
    await connectToDatabase();
    const { key, enabled } = await req.json();

    if (!FLAGS.includes(key)) {
      return NextResponse.json(
        { error: "Invalid feature flag key" },
        { status: 400 }
      );
    }

    const updatedFlag = await FeatureFlag.findOneAndUpdate(
      { key },
      { enabled },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedFlag);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
