import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
    permissions?: { section: string; actions: string[] }[];
    mustChangePassword?: boolean;
  }

  interface Session {
    user: {
      userId: string;
      role: string;
      permissions: { section: string; actions: string[] }[];
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    role: string;
    permissions: { section: string; actions: string[] }[];
    mustChangePassword: boolean;
  }
}
