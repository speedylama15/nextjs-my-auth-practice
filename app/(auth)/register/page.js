import Link from "next/link";

import RegisterForm from "./RegisterForm";

import "../auth-page.css";
import Image from "next/image";

const RegisterPage = () => {
	return (
		<div className="auth-page">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
