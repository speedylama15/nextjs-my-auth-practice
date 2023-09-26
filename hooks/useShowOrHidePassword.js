import { useState } from "react";

const useShowOrHidePassword = () => {
	const [isHidden, setIsHidden] = useState(true);

	const handlePasswordStateOnClick = () => {
		setIsHidden((prev) => !prev);
	};

	return {
		isHidden,
		setIsHidden,
		handlePasswordStateOnClick,
	};
};

export default useShowOrHidePassword;
