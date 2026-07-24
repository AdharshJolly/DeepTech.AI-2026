import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requirePermission } from "@/lib/permissions";
import connectToDatabase from "@/lib/db";
import AdminUser from "@/models/AdminUser";

export async function GET() {
  const { error } = await requirePermission("users", "read");
  if (error) return error;

  try {
    await connectToDatabase();
    const users = await AdminUser.find()
      .select("-password")
      .sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { error } = await requirePermission("users", "create");
  if (error) return error;

  try {
    await connectToDatabase();
    const { name, email, role, permissions } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const existing = await AdminUser.findOne({
      email: email.toLowerCase(),
    });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash("password123", 12);

    const user = await AdminUser.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "admin",
      permissions: permissions || [],
      mustChangePassword: true,
    });

    const userObj = user.toObject();
    delete userObj.password;
    return NextResponse.json(userObj);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
