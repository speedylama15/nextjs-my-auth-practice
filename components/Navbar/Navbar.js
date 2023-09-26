import Image from "next/image";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import * as jose from "jose";

import { secret } from "@/lib/generateJWT";

import "./Navbar.css";

const Navbar = async () => {
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
		<nav className="navbar">
			<Link className="navbar_logo" href={"/"}>
				NEXTJS
			</Link>

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

					<Link href="/gallery">Gallery</Link>
				</div>
			) : (
				<Link href="/login">Login</Link>
			)}
		</nav>
	);
};

export default Navbar;
