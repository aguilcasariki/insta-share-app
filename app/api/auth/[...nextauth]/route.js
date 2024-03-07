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
        const user = { id: 1, name: "Admin", email: "admin@example.com" };

        
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return user;
        } else {
          
          return null;
        }
      },
    }),
  ],
  
});

export {handler as GET, handler as POST}