import NextAuth from "next-auth";
import Providers from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        return { email: credentials.email };
      },
    }),
  ],
});
