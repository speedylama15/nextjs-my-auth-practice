const decodeToken = (token) => {
	const payload = atob(token.split(".")[1]);

	return JSON.parse(payload);
};

export default decodeToken;
