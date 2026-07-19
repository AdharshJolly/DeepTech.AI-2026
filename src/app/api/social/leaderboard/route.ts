import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

export async function GET() {
  try {
    await connectToDatabase();

    const leaderboard = await SocialSubmission.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: "$email",
          socialHandle: { $first: "$socialHandle" },
          points: { $sum: "$points" }
        }
      },
      { $sort: { points: -1 } },
      { $limit: 10 }
    ]);

    const formatted = leaderboard.map((user, idx) => ({
      rank: idx + 1,
      name: user.socialHandle,
      points: user.points,
      badge: user.points >= 250 ? "DeepTech Titan" : 
             user.points >= 150 ? "AI Evangelist" : 
             user.points >= 80 ? "Edge Influencer" : "Rising Contributor",
      avatar: user.socialHandle.replace(/[^a-zA-Z]/g, "").substring(0, 2).toUpperCase() || "DT"
    }));

    return NextResponse.json(formatted);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
