import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Registration from "@/models/Registration";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { fullName, email, phone, organization, jobTitle } = await req.json();

    if (!fullName || !email || !organization || !jobTitle) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const existing = await Registration.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 400 }
      );
    }

    const registration = await Registration.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || "",
      organization: organization.trim(),
      jobTitle: jobTitle.trim(),
    });

    return NextResponse.json({ success: true, registration });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 400 }
      );
    }
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
