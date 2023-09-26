import { useEffect } from "react";

const useFocusRef = (elementRef) => {
	useEffect(() => {
		elementRef?.current.focus();
	}, []);
};

export default useFocusRef;
