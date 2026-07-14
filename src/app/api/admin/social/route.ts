import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import SocialSubmission from "@/models/SocialSubmission";

export async function GET() {
  try {
    await connectToDatabase();
    const submissions = await SocialSubmission.find().sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();

    if (!id || !status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const updated = await SocialSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, submission: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
