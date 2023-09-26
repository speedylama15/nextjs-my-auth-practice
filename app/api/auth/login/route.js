import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

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

		if (key === "email") {
			if (!isEmail(value)) {
				errors[key] = "Inappropriate email format";
			}
		}
	}

	if (Object.values(errors).length > 0) {
		return NextResponse.json({ errors });
	}

	// TODO: if everything goes the way it should, that means checkEmail becomes the user
	const checkEmail = await UserModel.getUserByEmail(body.email);

	if (!checkEmail) {
		return NextResponse.json({ errors: { email: "Incorrect email" } });
	}

	const checkPassword = await UserModel.getUserByEmailAndGetPassword(
		body.email
	);

	if (body.password !== checkPassword.password) {
		return NextResponse.json({ errors: { password: "Incorrect password" } });
	}

	const accessToken = await generateJWT("accessToken", checkEmail);
	const refreshToken = await generateJWT("refreshToken", { id: checkEmail.id });

	cookies().set("accessToken", accessToken, { httpOnly: true, path: "/" });
	cookies().set("refreshToken", refreshToken, { httpOnly: true, path: "/" });

	return NextResponse.json({ success: "success" });
}
