import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const userData = {
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: account.providerAccountId,
            role: "player",
            authMethods: ["google"],
          };
          const newUser = await User.create(userData);
          user.id = newUser._id.toString();
          user.role = newUser.role;
        } else {
          if (account.provider === "google" && user.image) {
            await User.findByIdAndUpdate(existingUser._id, {
              $set: { image: user.image },
              $addToSet: { authMethods: "google" },
              googleId: account.providerAccountId,
            });
          }
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
        }
        return true;
      } catch (error) {
        console.error("SignIn Error Details:", error);
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
