import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const url_authToken = searchParams.get("token") || null;
	const accessToken =
		url_authToken !== undefined
			? await prisma.account.findFirst({
					where: {
						access_token: url_authToken,
					},
					select: {
						userId: true,
					},
			  })
			: null;
	if (url_authToken !== undefined && accessToken !== null) {
		return NextResponse.json(accessToken.userId);
	} else {
		return new Response(null);
	}
}
