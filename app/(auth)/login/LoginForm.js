import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import useFocusRef from "@/hooks/useFocusRef";
import useShowOrHidePassword from "@/hooks/useShowOrHidePassword";
import FormError from "@/components/FormError/FormError";

import "../auth-page.css";
import "./login.css";

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const router = useRouter();

	const focusRef = useRef();

	useFocusRef(focusRef);
	const { isHidden, handlePasswordStateOnClick } = useShowOrHidePassword();

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const formData = new FormData(e.currentTarget);

		const body = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const response = await fetch("http://localhost:3000/api/auth/login", {
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

		setIsLoading(false);
	};

	return (
		<form className="auth-form" onSubmit={handleOnSubmit}>
			<h1 className="auth-header">Login</h1>

			<Link className="auth-link" href={"/register"}>
				Don't have an account? <span>Register</span>
			</Link>

			<fieldset className="auth-fieldset_login">
				<div className="auth-field">
					<div className="auth-input">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							ref={focusRef}
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
				Login
			</button>
		</form>
	);
};

export default LoginForm;
