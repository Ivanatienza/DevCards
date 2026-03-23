import { pool } from "../config/db.js";

export const createTag = async (name) => {
    const [result] = await pool.query(
        "INSERT IGNORE INTO tags (name) VALUES (?)",
        [name]
    );
    if(result.insertId){
        return result.insertId;
    }

    const [rows] = await pool.query(
        "SELECT id FROM tags WHERE name = ?",
        [name]
    );
    
    return rows[0]?.id
};

export const getAllTags = async() => {
    const [rows] = await pool.query(
        "SELECT * FROM tags"
    );
    return rows;
};