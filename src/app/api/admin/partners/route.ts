import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Partner from '@/models/Partner';

export async function GET() {
  await connectToDatabase();
  const partners = await Partner.find().sort({ order: 1 });
  return NextResponse.json(partners);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const newPartner = await Partner.create(data);
  return NextResponse.json(newPartner);
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const { _id, ...updateData } = data;
  const updatedPartner = await Partner.findByIdAndUpdate(_id, updateData, { new: true });
  return NextResponse.json(updatedPartner);
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) await Partner.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
