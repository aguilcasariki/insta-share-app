import connectDB from "@/libs/db";
import bcrypt from "bcrypt"
import User from "@/models/user.model";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB()

        const userFound = await User.findOne({ username: credentials?.username })
        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
        
        if (!userFound || !passwordMatch) {
          console.log("Invalid Credentials")
          return new Error( "Invalid Credentials" )
        }

        return userFound
      },
    }),
  ],
  callbacks: {
    jwt({token,user}) {
      if (user) {
        token.user = user;
      }
      return token
    },
    session({ session, token }) {
      session.user=token.user
      return session
    }
  },
  pages: {
    signIn: "/login",
  }
  
});

export {handler as GET, handler as POST}