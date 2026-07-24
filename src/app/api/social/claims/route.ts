import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    const submissions = await SocialSubmission.find({
      email: email.toLowerCase(),
    }).select("questId status");

    const claimed = submissions
      .filter((s) => s.status === "approved" || s.status === "pending")
      .map((s) => s.questId);

    return NextResponse.json({ claimed });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
