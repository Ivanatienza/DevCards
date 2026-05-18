import { pool } from "../config/db.js";

//Crear un usuario
export const createUser = async (name,surname,email,password,role="user",avatar_url=null) => {
    const [result] = await pool.query(
        "INSERT INTO users (name,surname,email,password,role,avatar_url)VALUES(?,?,?,?,?,?)",
        [name,surname,email,password,role,avatar_url]
    );
    const userId = result.insertId;
    return userId;
};

//Obtener usuario por ID
export const getUserById = async(id) => {
    const [rows] = await pool.query(
        `SELECT id,name,surname,email,avatar_url
        FROM users WHERE id = ?`,
        [id]
    );
    return rows[0];
};

//Actualizar usuario
export const updateUser = async(id,name,surname,email,avatar_url) => {
    await pool.query(
        `UPDATE users 
        SET name = ?, surname = ?, email = ?, avatar_url = ?
        WHERE id = ?`,
        [name,surname,email,avatar_url,id]
    );
};

//Obtener usuario por su email
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
};

//Obtener todos los usuarios
export const getAllUsers = async() => {
    const [rows] = await pool.query(
        "SELECT * FROM users")
        return rows;
};

//Eliminar un usuario
export const deleteUser = async(id) => {
    const [result] = await pool.query(
        "DELETE FROM users WHERE id = ? ", [id]);
    return result;
};