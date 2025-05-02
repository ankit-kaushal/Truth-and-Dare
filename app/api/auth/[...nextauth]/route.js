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
        console.log("Starting signIn callback");
        await connectToDatabase();
        console.log("ConnectToDatabase SUCCESS");
        const existingUser = await User.findOne({ email: user.email });
        console.log("Existing user check:", existingUser);

        if (!existingUser) {
          console.log("Creating new user for:", user.email);
          const userData = {
            name: user.name,
            email: user.email,
            image: user.image,
            googleId: account.providerAccountId,
            role: "player",
            authMethods: ["google"],
          };
          console.log("User data to create:", userData);

          const newUser = await User.create(userData);
          console.log("New user created:", newUser);

          user.id = newUser._id.toString();
          user.role = newUser.role;
        } else {
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
