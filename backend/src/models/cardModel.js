import { pool } from "../config/db.js";

export const createCard = async(user_id,logo_url,title,description,documentation_url,is_public) => {
    const [result] = await pool.query("INSERT INTO cards(user_id,logo_url,title,description,documentation_url,is_public)VALUES(?,?,?,?,?,?)",
        [user_id,logo_url,title,description,documentation_url,is_public]
    );
    return result.insertId;
};

export const getCards = async(user_id, search="") => {
    const [rows] = await pool.query(
        "SELECT * FROM cards WHERE user_id = ? AND (title LIKE ? OR description LIKE ?) ORDER BY created_at DESC", [user_id, `%${search}%`, `%${search}%`]
    );
    return rows;
};

export const getPublicCardsModel = async() => {
    const [rows] = await pool.query(
        "SELECT * FROM cards WHERE is_public = true ORDER BY created_at DESC"
    );
    return rows;
};


export const updateCard = async (id,logo_url,title,description,documentation_url,is_public) => {
    await pool.query(
        "UPDATE cards SET logo_url=?, title=?, description=?, documentation_url=?, is_public=? WHERE id=?"
        [logo_url,title,description,documentation_url,is_public,id]
    );
};

export const deleteCard = async(id) => {
    await pool.query(
        "DELETE FROM cards WHERE id=?", [id]
    );
};