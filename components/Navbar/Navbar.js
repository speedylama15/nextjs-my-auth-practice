import Link from "next/link";

import "./Navbar.css";

const Navbar = () => {
	const activeUser = null;

	return (
		<nav className="navbar">
			<Link className="navbar_logo" href={"/"}>
				NEXTJS
			</Link>

			<Link href="/gallery">Gallery</Link>
			<Link href="/login">Login</Link>

			{/* {activeUser ? (
				<Link href="/gallery">Gallery</Link>
			) : (
				<Link href="/login">Login</Link>
			)} */}
		</nav>
	);
};

export default Navbar;
