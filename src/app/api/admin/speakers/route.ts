import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import Speaker from "@/models/Speaker";

export async function GET() {
  const { error } = await requirePermission("speakers", "read");
  if (error) return error;

  await connectToDatabase();
  const speakers = await Speaker.find().sort({ order: 1 });
  return NextResponse.json(speakers);
}

export async function POST(req: Request) {
  const { error } = await requirePermission("speakers", "create");
  if (error) return error;

  await connectToDatabase();
  const data = await req.json();
  const newSpeaker = await Speaker.create(data);
  return NextResponse.json(newSpeaker);
}

export async function PUT(req: Request) {
  const { error } = await requirePermission("speakers", "update");
  if (error) return error;

  await connectToDatabase();
  const data = await req.json();
  const { _id, ...updateData } = data;
  const updatedSpeaker = await Speaker.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  return NextResponse.json(updatedSpeaker);
}

export async function DELETE(req: Request) {
  const { error } = await requirePermission("speakers", "delete");
  if (error) return error;

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) await Speaker.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
