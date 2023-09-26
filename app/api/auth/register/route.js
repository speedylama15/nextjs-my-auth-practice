import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";

import UserModel from "../../model/UserModel";
import generateJWT from "@/lib/generateJWT";

export async function POST(request) {
	const body = await request.json();
	const keys = Object.keys(body);
	const errors = {};

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const value = body[key];

		if (isEmpty(value)) {
			errors[key] = "Field cannot be empty";
		}

		if (key === "fullName") {
			if (!isAlpha(value)) {
				errors[key] = "Inappropriate full name";
			}
		}

		if (key === "username") {
			if (!isAlphanumeric(value)) {
				errors[key] = "Inappropriate username";
			}
		}

		if (key === "email") {
			if (!isEmail(value)) {
				errors[key] = "Inappropriate email format";
			}
		}
	}

	if (Object.values(errors).length > 0) {
		return NextResponse.json({ errors });
	}

	try {
		const duplicateEmail = await UserModel.getUserByEmail(body.email);
		const duplicateUsername = await UserModel.getUserByUsername(body.username);

		if (duplicateEmail) {
			errors.email = "Please use another email";
		}
		if (duplicateUsername) {
			errors.username = "Please use another username";
		}

		if (Object.values(errors).length > 0) {
			return NextResponse.json({ errors });
		}

		const user = await UserModel.createUser(body);

		const accessToken = await generateJWT("accessToken", user);
		const refreshToken = await generateJWT("refreshToken", { id: user.id });

		cookies().set("accessToken", accessToken, { httpOnly: true, path: "/" });
		cookies().set("refreshToken", refreshToken, { httpOnly: true, path: "/" });

		return NextResponse.json({ success: "success" });
	} catch (error) {
		return NextResponse.json({ errors: { network: "Network Error" } });
	}
}
