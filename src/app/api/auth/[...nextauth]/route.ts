import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@ieee.org" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials &&
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "DeepTech Admin", email: credentials.email };
        }
        return null; // login failed
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
