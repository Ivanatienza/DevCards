import { pool } from "../config/db.js";

export const addTagToCard = async(card_id, tag_id) => {
    await pool.query(
        "INSERT INTO card_tags (card_id, tag_id) VALUES(?,?)",
        [card_id, tag_id]
    )
};

export const getTagsByCard = async(card_id) => {
    const [rows] = await pool.query(
        "SELECT t. * FROM tags t JOIN card_tags ct ON t.id=ct.tag_id WHERE ct.card_id=?",
        [card_id]
    )
    return rows
};