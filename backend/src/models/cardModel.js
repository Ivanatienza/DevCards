import { pool } from "../config/db.js";

//Crear una card
export const createCard = async(user_id,logo_url,title,description,documentation_url,is_public) => {
    const [result] = await pool.query(
        "INSERT INTO cards(user_id,logo_url,title,description,documentation_url,is_public)VALUES(?,?,?,?,?,?)",
        [user_id,logo_url,title,description,documentation_url,is_public]
    );
    return result.insertId;
};

//Obtener las cards
export const getCards = async(user_id, search="") => {
    const [rows] = await pool.query(
        `SELECT c.*, GROUP_CONCAT(DISTINCT t.name) as tags
        FROM cards c
        LEFT JOIN card_tags ct ON c.id = ct.card_id
        LEFT JOIN tags t ON ct.tag_id = t.id
        WHERE c.user_id = ?
        AND c.title LIKE ?
        GROUP BY c.id
        ORDER BY c.created_at DESC`,
        [user_id, `%${search}%`]
    );
    
    return rows.map(card => ({
        ...card,
        tags: card.tags ? card.tags.split(",") : []
    }));
};

//Obtener card por ID
export const getCardById = async(id) => {
    const [rows] = await pool.query(
        "SELECT * FROM cards WHERE id = ?",
        [id]
    );
    return rows[0];
};

//Obtener las cards activas (públicas por el usuario)
export const getPublicCardsModel = async(limit=20,offset=0) => {
    const [rows] = await pool.query(
        `SELECT c.*,
        GROUP_CONCAT(DISTINCT t.name) as tags
        FROM cards c
        LEFT JOIN card_tags ct ON c.id = ct.card_id
        LEFT JOIN tags t ON ct.tag_id = t.id
        WHERE c.is_public = 1
        GROUP BY c.id`
    );
    return rows.map(card => ({
        ...card,
        tags: card.tags ? card.tags.split(",") : []
    }));
};

//Actualizar una card
export const updateCard = async (id,logo_url,title,description,documentation_url,is_public) => {
    await pool.query(
        `UPDATE cards 
        SET logo_url=?, title=?, description=?, documentation_url=?, is_public=? 
        WHERE id=?`,
        [logo_url,title,description,documentation_url,is_public,id]
    );
};

//Eliminar una card
export const deleteCard = async(id) => {
    const [result] = await pool.query(
        "DELETE FROM cards WHERE id = ?", 
        [id]
    );
    
    return result;
};