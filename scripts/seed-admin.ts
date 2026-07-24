import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";
import readline from "readline";
import AdminUser from "../src/models/AdminUser";

config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function seed() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  console.log("\n=== DeepTech.AI 2026 — SuperAdmin Setup ===\n");

  const name = await ask("Name: ");
  const email = await ask("Email: ");
  const password = await ask("Password: ");

  if (!name.trim() || !email.trim() || !password.trim()) {
    console.error("\nAll fields are required.");
    rl.close();
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("\nConnected to MongoDB");

  const hashedPassword = await bcrypt.hash(password.trim(), 12);
  const existing = await AdminUser.findOne({ email: email.toLowerCase().trim() });

  if (existing) {
    await AdminUser.findByIdAndUpdate(existing._id, {
      name: name.trim(),
      role: "superAdmin",
      mustChangePassword: false,
      password: hashedPassword,
    });
    console.log(`Updated ${email} to SuperAdmin`);
  } else {
    await AdminUser.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "superAdmin",
      mustChangePassword: false,
      permissions: [],
    });
    console.log(`Created SuperAdmin: ${email}`);
  }

  await mongoose.disconnect();
  rl.close();
  console.log("Done!");
}

seed().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
