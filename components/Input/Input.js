"use client";

import "./Input.css";

const Input = ({
	label,
	front,
	back,
	className = "",
	inputClassname = "",
	identity,
	placeholder,
	type,
}) => {
	return (
		<div className={`input ${className}`}>
			{front}

			{/* TODO: the for has to match the id of the input */}
			<label className="visually-hidden" htmlFor={identity}>
				{label}
			</label>

			<input
				className={`input_input ${inputClassname}`}
				type={type}
				name={identity}
				id={identity}
				placeholder={placeholder}
			/>

			{back}
		</div>
	);
};

export default Input;
