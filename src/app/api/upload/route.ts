import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // Expecting a base64 encoded image string

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'deeptech2026',
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
