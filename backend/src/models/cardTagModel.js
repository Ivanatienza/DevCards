import pool from "../config/db.js";

/* =========================
   ADD TAG TO CARD
========================= */
export const addTagToCard = async (card_id, tag_id, connection = pool) => {
  await connection.query(
    `INSERT IGNORE INTO card_tags (card_id, tag_id)
     VALUES (?, ?)`,
    [card_id, tag_id]
  );
};

/* =========================
   REMOVE ALL TAGS
========================= */
export const removeAllTagsFromCard = async (card_id, connection = pool) => {
  await connection.query(
    `DELETE FROM card_tags WHERE card_id = ?`,
    [card_id]
  );
};

/* =========================
   GET TAGS BY CARD
========================= */
export const getTagsByCardId = async (card_id) => {
  const [rows] = await pool.query(
    `
    SELECT t.id, t.name
    FROM tags t
    JOIN card_tags ct ON ct.tag_id = t.id
    WHERE ct.card_id = ?
    `,
    [card_id]
  );

  return rows;
};
