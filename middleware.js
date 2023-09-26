import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

import generateJWT from "./lib/generateJWT";
import { secret } from "./lib/generateJWT";
import decodeToken from "./lib/decodeToken";

export async function middleware(request) {
	// REVIEW: remove
	console.log(request.nextUrl.pathname);

	const accessToken = cookies().get("accessToken")?.value;
	const refreshToken = cookies().get("refreshToken")?.value;
	const response = NextResponse.next();

	if (!accessToken || !refreshToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// TODO: check refresh token
	try {
		const { payload } = await jose.jwtVerify(refreshToken, secret);
	} catch (error) {
		// TODO: does not matter what the cause of the error is, log the user out
		response.cookies.set("accessToken", "", { maxAge: 0 });
		response.cookies.set("refreshToken", "", { maxAge: 0 });
		response.headers.set("newAccessToken", "");
		return response;
	}

	try {
		const { payload } = await jose.jwtVerify(accessToken, secret);
	} catch (error) {
		// REVIEW: remove
		console.log("ERROR NAME", error.name);
		if (error.name === "JWTExpired") {
			// REVIEW: remove
			console.log("JWT EXPIRED BRUH");

			const newAT = await generateJWT("accessToken", decodeToken(accessToken));

			response.cookies.set("accessToken", newAT, { httpOnly: true, path: "/" });
			response.headers.set("newAccessToken", newAT);
			return response;
		} else {
			response.cookies.set("accessToken", "", { maxAge: 0 });
			response.cookies.set("refreshToken", "", { maxAge: 0 });
			response.headers.set("newAccessToken", "");
			return response;
		}
	}
}

export const config = {
	matcher: ["/", "/gallery"],
};
