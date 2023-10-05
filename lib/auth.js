async function getData(token) {
	const res = await fetch(`http://localhost:3000/api/token?token=${token}`);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function isAuthenticated(request) {
	const { searchParams } = new URL(request.url);
	const url_authToken = searchParams.get("token") || null;
	const authToken = url_authToken === null || url_authToken === undefined ? request.headers.get("authorization")?.replace(/^Bearer\s/, "") : url_authToken;
	const accessToken = authToken !== undefined && authToken !== null ? await getData(authToken) : null;
	if (authToken !== undefined && authToken !== null && accessToken !== false) {
		return accessToken;
	} else {
		return null;
	}
}
