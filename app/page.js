import { cookies, headers } from "next/headers";
import * as jose from "jose";

import { secret } from "@/lib/generateJWT";
import Image from "next/image";

export default async function Home() {
	const headersList = headers();

	const headerAccessToken = headersList.get("newAccessToken");
	const cookieAccessToken = cookies().get("accessToken")?.value;

	const accessToken = headerAccessToken ? headerAccessToken : cookieAccessToken;

	let user;

	try {
		const { payload } = await jose.jwtVerify(accessToken, secret);

		user = payload;
	} catch (error) {
		console.log(error);
	}

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
			}}
		>
			{user ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						marginTop: "5rem",
					}}
				>
					<Image
						style={{ borderRadius: "50%" }}
						src={user.avatar_url}
						width={100}
						height={100}
						alt="Profile image"
					/>

					<p>{user.username}</p>

					<p>{user.full_name}</p>
				</div>
			) : (
				<h1>NOT LOGGED IN</h1>
			)}
		</div>
	);
}
