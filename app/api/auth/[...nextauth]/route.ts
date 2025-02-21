import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          
          // Update or create user in MongoDB
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              email: user.email,
              image: user.image,
              googleId: account.providerAccountId,
              lastLogin: new Date(),
            },
            { upsert: true, new: true }
          );
          
          return true;
        } catch (error) {
          console.error("Error saving user to MongoDB:", error);
          // In development, allow sign in even if DB fails
          return process.env.NODE_ENV === 'development';
        }
      }
      return true;
    },
    async session({ session, token }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST }; 