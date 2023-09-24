"use client";

import Link from "next/link";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Input from "@/components/Input/Input";
import { createUser } from "@/app/actions";

import "../auth-page.css";

const initialState = {
	user: null,
	message: null,
};

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	// TODO: state returns the updated initialState
	const [state, formAction] = useFormState(createUser, initialState);

	// REVIEW: remove
	console.log("STATE", state);

	const handlePasswordButtonOnClick = (e) => {
		e.preventDefault();

		setShowPassword((prev) => !prev);
	};

	return (
		<div className="auth-page">
			<form className="auth-form" action={formAction}>
				<h2>Register</h2>

				<Input
					type={"text"}
					identity={"email"}
					placeholder={"Email"}
					label={"Email"}
				/>

				<Input
					type={"text"}
					identity={"username"}
					placeholder={"Username"}
					label={"Username"}
				/>

				<Input
					type={"text"}
					identity={"fullName"}
					placeholder={"Full Name"}
					label={"Full Name"}
				/>

				<Input
					className="input_password"
					type={showPassword ? "text" : "password"}
					identity={"password"}
					placeholder={"Password"}
					label={"Password"}
					back={
						<button
							onClick={handlePasswordButtonOnClick}
							className="input_password-button"
						>
							{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
						</button>
					}
				/>

				<button className="button">Register</button>

				<Link href={"/login"}>Already have an account? Login</Link>
			</form>
		</div>
	);
};

export default RegisterPage;
