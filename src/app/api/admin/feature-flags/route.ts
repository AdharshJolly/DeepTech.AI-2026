import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import FeatureFlag from '@/models/FeatureFlag';

const FLAGS = ['speakers', 'agenda'];

export async function GET() {
  try {
    await connectToDatabase();
    
    // Ensure default flags exist in the database
    for (const key of FLAGS) {
      const exists = await FeatureFlag.findOne({ key });
      if (!exists) {
        await FeatureFlag.create({ key, enabled: false });
      }
    }

    const flags = await FeatureFlag.find();
    return NextResponse.json(flags);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { key, enabled } = await req.json();
    
    if (!FLAGS.includes(key)) {
      return NextResponse.json({ error: 'Invalid feature flag key' }, { status: 400 });
    }

    const updatedFlag = await FeatureFlag.findOneAndUpdate(
      { key },
      { enabled },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedFlag);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
