import pool from "@/lib/pool";

class UserModel {
	static async getUserByID(id) {
		const { rows } = await pool.query(
			`
            SELECT
            id, username, full_name, email, avatar_url
            FROM users
            WHERE id=$1;
            `,
			[id]
		);

		return rows[0];
	}

	static async getUserByEmail(email) {
		const { rows } = await pool.query(
			`
            SELECT
            id, username, full_name, email, avatar_url
            FROM users
            WHERE email=$1;
            `,
			[email]
		);

		return rows[0];
	}

	static async getUserByUsername(username) {
		const { rows } = await pool.query(
			`
            SELECT
            id, username, full_name, email, avatar_url
            FROM users
            WHERE username=$1;
            `,
			[username]
		);

		return rows[0];
	}

	static async createUser({ fullName, username, email, password }) {
		const { rows } = await pool.query(
			`
			INSERT INTO users (full_name, username, email, password)
			VALUES ($1, $2, $3, $4)
			RETURNING id, full_name, username, email, avatar_url;
			`,
			[fullName, username, email, password]
		);

		return rows[0];
	}
}

export default UserModel;
