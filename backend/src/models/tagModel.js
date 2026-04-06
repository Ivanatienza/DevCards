import { pool } from "../config/db.js";

//Crear una etiqueta de una card
export const createTag = async (name) => {
    const validName = name.trim().toLowerCase();
    const [exists] = await pool.query(
        "SELECT id FROM tags WHERE name = ?",
        [validName]
    );
    
    if(exists.length > 0){
        return exists[0].id;
    }

    const [result] = await pool.query(
        "INSERT INTO tags (name) VALUES (?)",
        [validName]
    );
    
    return result.insertId;
};

//Obtener las etiquetas creadas de una card
export const getAllTags = async() => {
    const [rows] = await pool.query(
        `SELECT * FROM tags 
        ORDER BY name ASC`
    );

    return rows;
};