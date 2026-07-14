import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

export async function GET() {
  try {
    await connectToDatabase();

    const submissions = await SocialSubmission.find({ status: "approved" })
      .sort({ updatedAt: -1 })
      .limit(30);

    const QUEST_THEMES: Record<string, string> = {
      "quest-1": "Announced registration and shared the official symposium flyer! 🚀",
      "quest-2": "Tagged colleagues and invited them to attend the DeepTech summit! 🎯",
      "quest-3": "Shared registration confirmation excitement! #DeepTechAI2026 💻",
      "quest-4": "Amplified speaker keynotes and session announcements! 🔥"
    };

    const formattedPosts = submissions.map((sub) => {
      let platform: "linkedin" | "instagram" | "twitter" | "facebook" = "linkedin";
      if (sub.questId === "quest-2") platform = "instagram";
      if (sub.questId === "quest-3" || sub.questId === "quest-4") platform = "twitter";

      return {
        id: sub._id.toString(),
        user: sub.socialHandle.replace("@", ""),
        handle: sub.socialHandle.startsWith("@") ? sub.socialHandle : `@${sub.socialHandle}`,
        platform,
        content: QUEST_THEMES[sub.questId] || "Shared event update on social timeline!",
        time: "Verified",
        likes: sub.points,
        shares: 2,
        avatar: sub.socialHandle.replace(/[^a-zA-Z]/g, "").substring(0, 2).toUpperCase() || "DT",
        postUrl: sub.postUrl
      };
    });

    return NextResponse.json(formattedPosts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
