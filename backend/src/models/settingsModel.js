import { pool } from "../config/db.js";

//Obtener las preferencias del usuario
export const getSettings = async (user_id) => {
    const [rows] = await pool.query(
        "SELECT * FROM settings WHERE user_id = ?",
        [user_id]
    );
    return rows[0];
};

//Actualizar las preferencias del usuario
export const updateSettings = async (user_id,theme,language) => {
    await pool.query(
        `UPDATE settings
        SET theme = ?, language = ?
        WHERE user_id = ?`,
        [user_id,theme,language,theme,language]
    );
};