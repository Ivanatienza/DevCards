import pool from "../config/db.js";

//Añadir etiqueta a una card
export const addTagToCard = async(card_id, tag_id) => {
    await pool.query(
        `INSERT IGNORE INTO card_tags (card_id, tag_id) 
        VALUES(?,?)`,
        [card_id, tag_id]
    );
};

//Eliminar etiquetas de una card
export const removeAllTagsFromCard = async(card_id) => {
    await pool.query(
        "DELETE FROM card_tags WHERE card_id = ?", 
        [card_id]
    );
};