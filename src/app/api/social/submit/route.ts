import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

const QUEST_POINTS: Record<string, number> = {
  "quest-1": 50,
  "quest-2": 70,
  "quest-3": 100,
  "quest-4": 40
};

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email, socialHandle, questId, postUrl } = await req.json();

    if (!email || !socialHandle || !questId || !postUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const points = QUEST_POINTS[questId];
    if (!points) {
      return NextResponse.json({ error: "Invalid quest ID" }, { status: 400 });
    }

    // 1. Check if the postUrl is already claimed
    const existingUrl = await SocialSubmission.findOne({ postUrl });
    if (existingUrl) {
      return NextResponse.json({ error: "This link has already been claimed by another user" }, { status: 400 });
    }

    // 2. Check if the user has already submitted this quest
    const existingSubmission = await SocialSubmission.findOne({ email: email.toLowerCase(), questId });
    if (existingSubmission) {
      return NextResponse.json({ error: "You have already submitted a claim for this quest" }, { status: 400 });
    }

    // 3. Create the pending submission
    const newSubmission = await SocialSubmission.create({
      email: email.toLowerCase(),
      socialHandle,
      questId,
      postUrl,
      points,
      status: "pending"
    });

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Duplicate submission detected" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
