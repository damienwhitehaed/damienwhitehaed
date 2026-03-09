import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [CredentialsProvider({
    name: 'Credentials',
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      const user = await prisma.user.findUnique({ where: { email: credentials.email } });
      if (!user) return null;
      const match = await bcrypt.compare(credentials.password, user.passwordHash);
      if (!match) return null;
      return { id: user.id, name: user.username, email: user.email, role: user.role, isBanned: user.isBanned } as any;
    }
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) Object.assign(token, user); return token; },
    async session({ session, token }) { (session.user as any).id = token.id; (session.user as any).role = token.role; (session.user as any).isBanned = token.isBanned; return session; }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
