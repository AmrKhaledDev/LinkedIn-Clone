import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./lib/schemas/LoginSchema";
// =================================================================================
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.type !== "credentials") return true;
      const userFromDB = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!userFromDB?.emailVerified) return false;
      return true;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(data) {
        const validation = LoginSchema.safeParse(data);
        if (!validation.success) return null;
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: validation.data.email,
            },
          });
          if (!user || !user.password) return null;
          const passwordHash = await bcrypt.compare(
            validation.data.password,
            user.password,
          );
          if (!passwordHash) return null;
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
});
