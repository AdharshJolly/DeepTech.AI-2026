import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import Committee from "@/models/Committee";

export async function GET() {
  const { error } = await requirePermission("committee", "read");
  if (error) return error;

  await connectToDatabase();
  const members = await Committee.find().sort({ order: 1 });
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const { error } = await requirePermission("committee", "create");
  if (error) return error;

  await connectToDatabase();
  const data = await req.json();
  const newMember = await Committee.create(data);
  return NextResponse.json(newMember);
}

export async function PUT(req: Request) {
  const { error } = await requirePermission("committee", "update");
  if (error) return error;

  await connectToDatabase();
  const data = await req.json();
  const { _id, ...updateData } = data;
  const updatedMember = await Committee.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  return NextResponse.json(updatedMember);
}

export async function DELETE(req: Request) {
  const { error } = await requirePermission("committee", "delete");
  if (error) return error;

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) await Committee.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
