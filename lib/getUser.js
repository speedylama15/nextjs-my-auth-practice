import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import * as jose from "jose";

import { secret } from "./generateJWT";

const getUser = async () => {
	const headersList = headers();

	const headerAccessToken = headersList.get("newAccessToken");
	const cookieAccessToken = cookies().get("accessToken")?.value;

	console.log("headerAccessToken", headerAccessToken);
	console.log("cookieAccessToken", cookieAccessToken);

	let user;

	if (!headerAccessToken && !cookieAccessToken) {
		user = null;

		// REVIEW: maybe in the login and register page, set cookies to nothing
		// redirect("/login");
	}

	if (headerAccessToken) {
		// TODO: headerAccessToken equates to ""
		// TODO: that means user does not exist
		if (!headerAccessToken) {
			user = null;
		} else {
			try {
				const { payload } = await jose.jwtVerify(headerAccessToken, secret);
				user = payload;
			} catch (error) {
				user = null;

				// REVIEW: maybe in the login and register page, set cookies to nothing
				// redirect("/login");
			}
		}
	} else {
		try {
			const { payload } = await jose.jwtVerify(cookieAccessToken, secret);
			user = payload;
		} catch (error) {
			user = null;

			// REVIEW: maybe in the login and register page, set cookies to nothing
			// redirect("/login");
		}
	}

	return user;
};

export default getUser;
