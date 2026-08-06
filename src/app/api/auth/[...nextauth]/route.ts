import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import PartnerInquiry from "@/models/PartnerInquiry";
import SocialUser from "@/models/SocialUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@ieee.org" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        
        // 1. Check AdminUser
        const adminUser = await AdminUser.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (adminUser) {
          const isValid = await bcrypt.compare(
            credentials.password,
            adminUser.password
          );
          if (isValid) {
            return {
              id: adminUser._id.toString(),
              name: adminUser.name,
              email: adminUser.email,
              role: adminUser.role,
              permissions: adminUser.permissions,
              mustChangePassword: adminUser.mustChangePassword,
            };
          }
        }

        // 2. Check PartnerInquiry
        const partner = await PartnerInquiry.findOne({
          workEmail: credentials.email.toLowerCase(),
        });

        if (partner) {
          const isValid = await bcrypt.compare(
            credentials.password,
            partner.password
          );
          if (isValid) {
            return {
              id: partner._id.toString(),
              name: partner.contactPerson,
              email: partner.workEmail,
              role: "partner",
              permissions: [],
              mustChangePassword: false,
            };
          }
        }

        // 3. Check SocialUser
        const socialUser = await SocialUser.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (socialUser) {
          const isValid = await bcrypt.compare(
            credentials.password,
            socialUser.password
          );
          if (isValid) {
            return {
              id: socialUser._id.toString(),
              name: socialUser.socialHandle,
              email: socialUser.email,
              role: "socialUser",
              permissions: [],
              mustChangePassword: false,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role || "admin";
        token.permissions = user.permissions || [];
        token.mustChangePassword = user.mustChangePassword ?? true;
        token.userId = user.id;
      }
      if (trigger === "update" && session) {
        if (session.mustChangePassword !== undefined) {
          token.mustChangePassword = session.mustChangePassword;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as { section: string; actions: string[] }[];
        session.user.mustChangePassword = token.mustChangePassword as boolean;
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
