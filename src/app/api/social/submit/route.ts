import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";
import SocialUser from "@/models/SocialUser";
import { QUEST_POINTS } from "@/config/quests";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    const body = await req.json();
    
    // If logged in as socialUser, override email and handle
    const email = session?.user?.role === "socialUser" ? session.user.email : body.email;
    const { socialHandle, questId, postUrl, password } = body;

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

    // 3. User Account Logic
    const existingUser = await SocialUser.findOne({ email: email.toLowerCase() });
    
    if (!existingUser) {
      // First-time submitter, require a password
      if (!password || password.length < 6) {
        return NextResponse.json({ 
          error: "A password of at least 6 characters is required for first-time submissions",
          requiresPassword: true 
        }, { status: 400 });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await SocialUser.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        socialHandle,
        points: 0
      });
    } else if (!session || session.user.role !== "socialUser" || session.user.email !== email.toLowerCase()) {
      // User exists but is not logged in
      return NextResponse.json({ 
        error: "An account with this email already exists. Please log in to submit.",
        requiresLogin: true
      }, { status: 401 });
    }

    // 4. Create the pending submission
    const newSubmission = await SocialSubmission.create({
      email: email.toLowerCase(),
      socialHandle,
      questId,
      postUrl,
      points,
      status: "pending"
    });

    return NextResponse.json({ success: true, submission: newSubmission });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 11000) {
      return NextResponse.json({ error: "Duplicate submission detected" }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
