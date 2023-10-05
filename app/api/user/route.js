import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
	const session = await getServerSession(authOptions);

	if (session) {
		return new Response(JSON.stringify(session, null, 2));
	} else {
		return new Response("Nincs bejelentkezve");
	}
}
