import { NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export const config = {
	matcher: ["/api/article/:function*"],
};

export async function middleware(request) {
	const auth = await isAuthenticated(request);
	if (auth === null) {
		return Response.json({ success: false, message: "Azonosítás sikertelen. Szerezzen hozzáférést a http://localhost:3000/api/auth/signin/google oldalon" }, { status: 401 });
	}
	const headers = new Headers(request.headers);
	headers.set("userId", auth);

	return NextResponse.next({
		request: {
			headers: headers,
		},
	});
}
