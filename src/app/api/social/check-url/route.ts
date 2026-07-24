import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await SocialSubmission.findOne({ postUrl: url }).select(
      "email socialHandle status"
    );

    if (existing) {
      return NextResponse.json({
        taken: true,
        claimedBy: existing.socialHandle,
        status: existing.status,
      });
    }

    return NextResponse.json({ taken: false });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
