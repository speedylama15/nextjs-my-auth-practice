"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import useFocusRef from "@/hooks/useFocusRef";
import useShowOrHidePassword from "@/hooks/useShowOrHidePassword";
import FormError from "@/components/FormError/FormError";

import "../auth-page.css";
import "./register.css";

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const router = useRouter();

	const firstInputRef = useRef();

	useFocusRef(firstInputRef);
	const { isHidden, handlePasswordStateOnClick } = useShowOrHidePassword();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const formData = new FormData(e.currentTarget);

		const body = {
			fullName: formData.get("fullName"),
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const response = await fetch("http://localhost:3000/api/auth/register", {
			method: "POST",
			body: JSON.stringify(body),
		}).then((response) => response.json());

		const { success, errors } = response;

		if (errors) {
			setErrors(errors);
		}

		if (success) {
			setErrors(null);
			router.push("/");
			router.refresh();
		}

		console.log("RESPONSE", response);

		setIsLoading(false);
	};

	return (
		<form className="auth-form" onSubmit={handleOnSubmit}>
			<h1 className="auth-header">Register</h1>

			<Link className="auth-link" href={"/login"}>
				Already have an account? <span>Login</span>
			</Link>

			<fieldset className="auth-fieldset_register">
				<div className="auth-field">
					<div className="auth-input">
						<label htmlFor="fullName">Full Name</label>
						<input
							ref={firstInputRef}
							type="text"
							id="fullName"
							name="fullName"
							placeholder="Full Name"
							required
						/>
					</div>

					{errors?.fullName && <FormError>* {errors.fullName}</FormError>}
				</div>

				<div className="auth-field">
					<div className="auth-input">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							required
						/>
					</div>

					{errors?.username && <FormError>* {errors.username}</FormError>}
				</div>

				<div className="auth-field">
					<div className="auth-input">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							required
						/>
					</div>

					{errors?.email && <FormError>* {errors.email}</FormError>}
				</div>

				<div className="auth-field">
					<div className="auth-input">
						<label htmlFor="password">Password</label>
						<input
							type={isHidden ? "password" : "text"}
							id="password"
							name="password"
							placeholder="Password"
							required
						/>

						{isHidden ? (
							<AiFillEye onClick={handlePasswordStateOnClick} size={"2.2rem"} />
						) : (
							<AiFillEyeInvisible
								onClick={handlePasswordStateOnClick}
								size={"2.2rem"}
							/>
						)}
					</div>

					{errors?.password && <FormError>* {errors.password}</FormError>}
				</div>
			</fieldset>

			<button disabled={isLoading ? true : false} className="auth-button">
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
