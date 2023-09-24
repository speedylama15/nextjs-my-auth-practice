"use client";

import Link from "next/link";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Input from "@/components/Input/Input";

import "../auth-page.css";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordButtonOnClick = (e) => {
		e.preventDefault();

		setShowPassword((prev) => !prev);
	};

	return (
		<div className="auth-page">
			<form className="auth-form">
				<h2>Login</h2>

				<Input
					type={"text"}
					identity={"email"}
					placeholder={"Email"}
					label={"Email"}
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

				<button className="button">Login</button>

				<Link href={"/register"}>Don't have an account? Register</Link>
			</form>
		</div>
	);
};

export default LoginPage;
