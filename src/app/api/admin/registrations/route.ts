import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import Registration from "@/models/Registration";

export async function GET() {
  const { error } = await requirePermission("registrations", "read");
  if (error) return error;

  try {
    await connectToDatabase();
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { error } = await requirePermission("registrations", "update");
  if (error) return error;

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
