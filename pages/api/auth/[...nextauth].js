import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 1* 60 * 60, // 1 hours
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        return { email: credentials.email_address };
      },
    }),
  ],
  secret: process.env.SECRET_API_KEY,
});
