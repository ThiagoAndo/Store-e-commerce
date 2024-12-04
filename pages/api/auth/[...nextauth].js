import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  // Session settings
  session: {
    jwt: true, // Use JSON Web Tokens (JWT) for session management
    strategy: "jwt", // Specifies the strategy as "jwt" instead of database sessions
    maxAge: 1 * 60 * 60, // The session will expire after 1 hour (in seconds)
  },

  // Authentication providers
  providers: [
    CredentialsProvider({
      /**
       * Custom credentials-based authentication provider.
       * This allows users to log in with their own credentials (e.g., email and password).
       */
      async authorize(credentials) {
        // This function should validate the provided credentials
        // and return a user object if authentication is successful.

        // Example: Return a user object with the provided email
        return { email: credentials.email_address };

        // Note: For production, you should validate the credentials
        // against a secure database or API and handle errors properly.
      },
    }),
  ],

  // Secret key for encrypting JWTs
  secret: process.env.SECRET_API_KEY, // Ensure this environment variable is set securely
});
