import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { clientPromise } from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID?.trim(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET?.trim(),
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (!user?.email) return false;
        
        await mongoose.connect(process.env.MONGODB_URI);
        const existingUser = await User.findOne({ email: user.email });
        
        if (existingUser) {
          // Update existing user with Google info
          await User.findOneAndUpdate(
            { email: user.email },
            { 
              $set: {
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
              }
            }
          );
          return true;
        }
        
        // Create new user with required fields
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          password: 'GOOGLE_AUTH', // Required field in model
          provider: 'google',
          emailVerified: new Date(),
          role: 'player'
        });
        
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return true; // Allow sign in even if DB operation fails
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.user._id = user.id || user._id;
        session.user.role = user.role || 'player';
        delete session.user.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + '/game';
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };