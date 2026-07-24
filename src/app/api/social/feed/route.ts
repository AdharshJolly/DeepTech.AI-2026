import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";
import { QUEST_PLATFORMS } from "@/config/quests";

export async function GET() {
  try {
    await connectToDatabase();

    const submissions = await SocialSubmission.find({ status: "approved" })
      .sort({ updatedAt: -1 })
      .limit(30);

    const formattedPosts = submissions.map((sub) => ({
      id: sub._id.toString(),
      user: sub.socialHandle.replace("@", ""),
      handle: sub.socialHandle.startsWith("@")
        ? sub.socialHandle
        : `@${sub.socialHandle}`,
      platform: QUEST_PLATFORMS[sub.questId] || "linkedin",
      content: "Shared on social media",
      time: "Verified",
      likes: sub.points,
      avatar:
        sub.socialHandle.replace(/[^a-zA-Z]/g, "").substring(0, 2).toUpperCase() ||
        "DT",
      postUrl: sub.postUrl,
    }));

    return NextResponse.json(formattedPosts);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
