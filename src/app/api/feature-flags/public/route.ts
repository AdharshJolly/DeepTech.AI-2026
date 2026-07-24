import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import FeatureFlag from "@/models/FeatureFlag";

const PUBLIC_FLAGS = ["registration"];

export async function GET() {
  try {
    await connectToDatabase();

    const result: Record<string, boolean> = {};
    for (const key of PUBLIC_FLAGS) {
      const flag = await FeatureFlag.findOne({ key });
      result[key] = flag?.enabled ?? false;
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ registration: false });
  }
}
