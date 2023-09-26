import Link from "next/link";
import { useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import useFocusRef from "@/hooks/useFocusRef";
import useShowOrHidePassword from "@/hooks/useShowOrHidePassword";

import "../auth-page.css";
import "./login.css";

const LoginForm = () => {
	const focusRef = useRef();

	useFocusRef(focusRef);
	const { isHidden, handlePasswordStateOnClick } = useShowOrHidePassword();

	const handleOnSubmit = () => {};

	return (
		<form className="auth-form" onSubmit={handleOnSubmit}>
			<h1 className="auth-header">Login</h1>

			<Link className="auth-link" href={"/register"}>
				Don't have an account? <span>Register</span>
			</Link>

			<fieldset className="auth-fieldset_login">
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
			</fieldset>

			<button className="auth-button">Register</button>
		</form>
	);
};

export default LoginForm;
