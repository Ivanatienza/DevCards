import { pool } from "../config/db.js";

export const createUser = async (name,surname,email,password,role="user",avatar_url=null) => {
    const [result] = await pool.query("INSERT INTO users (name,surname,email,password,role,avatar_url)VALUES(?,?,?,?,?,?)",
        [name,surname,email,password,role,avatar_url]
    )
    return result.insertId
};

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT FROM users WHERE email = ?",
        [email]
    )
    return rows[0]
};

export const getAllUsers = async() => {
    const [rows] = await pool.query("SELECT * FROM users")
        return rows
};


export const deleteUser = async(id) => {
    await pool.query("DELETE FROM users WHERE id = ? ",
        [id]
    )
};