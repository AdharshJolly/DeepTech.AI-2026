import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Registration from "@/models/Registration";

export async function GET() {
  try {
    await connectToDatabase();
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();

    if (!id || !status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const updated = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, registration: updated });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
