import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Agenda from '@/models/Agenda';

export async function GET() {
  await connectToDatabase();
  const agenda = await Agenda.find().sort({ order: 1 });
  return NextResponse.json(agenda);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const newItem = await Agenda.create(data);
  return NextResponse.json(newItem);
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const { _id, ...updateData } = data;
  const updatedItem = await Agenda.findByIdAndUpdate(_id, updateData, { new: true });
  return NextResponse.json(updatedItem);
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) await Agenda.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
