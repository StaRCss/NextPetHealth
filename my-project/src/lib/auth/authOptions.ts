import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

/**
 * Extend NextAuth types
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

/**
 * Prisma Singleton (important for production)
 */
const prisma =
  globalThis.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = prisma;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });

        // Fake hash to prevent timing attacks
        const fakeHash =
          "$2a$12$C6UzMDM.H6dfI/f/IKcEeO";

        const passwordHash = user?.password ?? fakeHash;

        const isValid = await bcrypt.compare(
          credentials.password,
          passwordHash
        );

        if (!user || !isValid) return null;

        // Optional: block unverified credentials users
        // if (!user.emailVerified) return null;

        return {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    /**
     * Runs on sign-in
     */
    async signIn({ user, account, profile }) {
  if (account?.provider === "google") {
    const googleProfile = profile as {
      email_verified?: boolean;
    };

    if (!googleProfile?.email_verified) {
      return false;
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { emailVerified: true },
    });

    if (!existingUser?.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    }
  }

  return true;
},

    /**
     * Attach user info to JWT
     */
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    /**
     * Attach token info to session
     */
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};