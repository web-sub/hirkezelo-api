import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user.id = user.id;
			const access_token = await prisma.account.findFirst({
				select: {
					access_token: true,
				},
				where: {
					userId: session.user.id,
				},
			});
			session.user.access_token = access_token.access_token;

			return session;
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
