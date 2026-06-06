import pool from "../config/db.js";

/* =========================
   CREATE CARD
========================= */
export const createCard = async (
  user_id,
  logo_url,
  title,
  description,
  documentation_url,
  is_public
) => {
  const [result] = await pool.query(
    `INSERT INTO cards
     (user_id, logo_url, title, description, documentation_url, is_public)
     VALUES (?,?,?,?,?,?)`,
    [
      user_id,
      logo_url || null,
      title,
      description,
      documentation_url,
      is_public ? 1 : 0,
    ]
  );

  return result.insertId;
};

/* =========================
   GET USER CARDS
========================= */
export const getCards = async (user_id, search = "") => {
  const [rows] = await pool.query(
    `
    SELECT c.*,
    GROUP_CONCAT(DISTINCT t.name) AS tags
    FROM cards c
    LEFT JOIN card_tags ct ON c.id = ct.card_id
    LEFT JOIN tags t ON ct.tag_id = t.id
    WHERE c.user_id = ?
      AND c.title LIKE ?
    GROUP BY c.id
    ORDER BY c.created_at DESC
    `,
    [user_id, `%${search}%`]
  );

  return rows.map((card) => ({
    ...card,
    is_public: Boolean(card.is_public),
    tags: card.tags ? card.tags.split(",") : [],
  }));
};

/* =========================
   GET CARD BY ID
========================= */
export const getCardById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT c.*,
    GROUP_CONCAT(DISTINCT t.name) AS tags
    FROM cards c
    LEFT JOIN card_tags ct ON c.id = ct.card_id
    LEFT JOIN tags t ON ct.tag_id = t.id
    WHERE c.id = ?
    GROUP BY c.id
    `,
    [id]
  );

  if (!rows.length) return null;

  const card = rows[0];

  return {
    ...card,
    is_public: Boolean(card.is_public),
    tags: card.tags ? card.tags.split(",") : [],
  };
};

/* =========================
   GET PUBLIC CARDS
========================= */
export const getPublicCardsModel = async () => {
  const [rows] = await pool.query(
    `
    SELECT c.*, u.name, u.avatar_url,
    GROUP_CONCAT(DISTINCT t.name) AS tags
    FROM cards c
    JOIN users u ON c.user_id = u.id
    LEFT JOIN card_tags ct ON c.id = ct.card_id
    LEFT JOIN tags t ON ct.tag_id = t.id
    WHERE c.is_public = 1
    GROUP BY c.id
    `
  );

  return rows.map((card) => ({
    ...card,
    is_public: Boolean(card.is_public),
    tags: card.tags ? card.tags.split(",") : [],
  }));
};

/* =========================
   UPDATE CARD
========================= */
export const updateCard = async (
  id,
  user_id,
  logo_url,
  title,
  description,
  documentation_url,
  is_public
) => {
  const [result] = await pool.query(
    `
    UPDATE cards
    SET logo_url = ?,
        title = ?,
        description = ?,
        documentation_url = ?,
        is_public = ?
    WHERE id = ?
      AND user_id = ?
    `,
    [
      logo_url || null,
      title,
      description,
      documentation_url,
      is_public ? 1 : 0,
      id,
      user_id,
    ]
  );

  return result;
};

/* =========================
   DELETE CARD
========================= */
export const deleteCard = async (id, user_id) => {
  const [result] = await pool.query(
    `
    DELETE FROM cards
    WHERE id = ? AND user_id = ?
    `,
    [id, user_id]
  );

  return result;
};
