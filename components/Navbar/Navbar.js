import Image from "next/image";
import Link from "next/link";

import getUser from "@/lib/getUser";

import "./Navbar.css";

export const dynamic = "force-dynamic";

const Navbar = async () => {
	const user = await getUser();

	console.log("USER", user);

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
