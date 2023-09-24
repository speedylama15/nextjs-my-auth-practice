"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import pool from "@/lib/pool";
import generateJWT from "@/lib/generateJWT";

// TODO: prev needs to exist to access formData (when useFormState is in use)
export async function createUser(prev, formData) {
	const email = formData.get("email");
	const username = formData.get("username");
	const fullName = formData.get("fullName");
	const password = formData.get("password");

	try {
		const checkEmail = await pool.query(
			`
	        SELECT
	        id, username, full_name, email, avatar_url
	        FROM users
	        WHERE email=$1;
	        `,
			[email]
		);

		const checkUsername = await pool.query(
			`
	        SELECT
	        id, username, full_name, email, avatar_url
	        FROM users
	        WHERE username=$1;
	        `,
			[username]
		);

		if (checkEmail.rows.length) {
			return { message: { error: "Please use a different email" } };
		}

		if (checkUsername.rows.length) {
			return { message: { error: "Please use a different username" } };
		}

		const { rows } = await pool.query(
			`
			INSERT INTO users (full_name, username, email, password)
			VALUES ($1, $2, $3, $4)
			RETURNING id, full_name, username, email, avatar_url;
			`,
			[fullName, username, email, password]
		);

		const user = rows[0];

		const accessToken = await generateJWT("accessToken", user);
		const refreshToken = await generateJWT("refreshToken", { id: user.id });

		cookies().set("accessToken", accessToken, { httpOnly: true, path: "/" });
		cookies().set("refreshToken", refreshToken, { httpOnly: true, path: "/" });
	} catch (error) {
		return { message: { error: error.message } };
	}

	// TODO: redirect has to be called outside of trycatch block
	redirect("/");
}
