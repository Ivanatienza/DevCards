import pool from "../config/db.js";

/* =========================
   GET USER CARDS
========================= */
export const getCards = async (req, res) => {
  try {
    const [cards] = await pool.query(
      `
      SELECT
        c.*,
        GROUP_CONCAT(DISTINCT t.name) AS tags
      FROM cards c
      LEFT JOIN card_tags ct
        ON c.id = ct.card_id
      LEFT JOIN tags t
        ON ct.tag_id = t.id
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.created_at DESC
      `,
      [req.user.id]
    );

    const formatted = cards.map((card) => ({
      ...card,
      is_public: Boolean(card.is_public),
      tags: card.tags ? card.tags.split(",") : [],
    }));

    res.json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error obteniendo cards",
    });
  }
};

/* =========================
   GET PUBLIC CARDS
========================= */
export const getPublicCards = async (req, res) => {
  try {
    const [cards] = await pool.query(
      `
      SELECT
        c.*,
        GROUP_CONCAT(DISTINCT t.name) AS tags
      FROM cards c
      LEFT JOIN card_tags ct
        ON c.id = ct.card_id
      LEFT JOIN tags t
        ON ct.tag_id = t.id
      WHERE c.is_public = 1
      GROUP BY c.id
      ORDER BY c.created_at DESC
      `
    );

    const formatted = cards.map((card) => ({
      ...card,
      is_public: Boolean(card.is_public),
      tags: card.tags ? card.tags.split(",") : [],
    }));

    res.json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error obteniendo cards públicas",
    });
  }
};

/* =========================
   GET CARD BY ID
========================= */
export const getCardById = async (req, res) => {
  try {
    const [cards] = await pool.query(
      `
      SELECT *
      FROM cards
      WHERE id = ?
      AND user_id = ?
      `,
      [req.params.id, req.user.id]
    );

    if (cards.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Card no encontrada",
      });
    }

    res.json({
      success: true,
      data: {
        ...cards[0],
        is_public: Boolean(cards[0].is_public),
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error obteniendo card",
    });
  }
};

/* =========================
   CREATE CARD
========================= */
export const createCard = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      title,
      description,
      documentation_url,
      logo_url,
      is_public,
      tags,
    } = req.body;

    if (!title || !description || !documentation_url) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    const [result] = await connection.query(
      `
      INSERT INTO cards
      (title, description, documentation_url, logo_url, is_public, user_id)
      VALUES (?,?,?,?,?,?)
      `,
      [
        title,
        description,
        documentation_url,
        logo_url || null,
        is_public ? 1 : 0,
        req.user.id,
      ]
    );

    const cardId = result.insertId;

    // =========================
    // TAGS SYSTEM
    // =========================
    if (tags) {
      const tagArray = Array.isArray(tags)
        ? tags
        : tags.split(",");

      for (const tagName of tagArray) {
        const cleanTag = tagName.trim().toLowerCase();

        if (!cleanTag) continue;

        const [existingTag] = await connection.query(
          `SELECT id FROM tags WHERE name = ?`,
          [cleanTag]
        );

        let tagId;

        if (existingTag.length === 0) {
          const [newTag] = await connection.query(
            `INSERT INTO tags (name) VALUES (?)`,
            [cleanTag]
          );
          tagId = newTag.insertId;
        } else {
          tagId = existingTag[0].id;
        }

        await connection.query(
          `INSERT IGNORE INTO card_tags (card_id, tag_id)
           VALUES (?, ?)`,
          [cardId, tagId]
        );
      }
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      id: cardId,
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error creando card",
    });

  } finally {
    connection.release();
  }
};

/* =========================
   UPDATE CARD
========================= */
export const updateCard = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      title,
      description,
      documentation_url,
      logo_url,
      is_public,
      tags,
    } = req.body;

    // 1. Update card data
    const [result] = await connection.query(
      `
      UPDATE cards
      SET title = ?, description = ?, documentation_url = ?, logo_url = ?, is_public = ?
      WHERE id = ? AND user_id = ?
      `,
      [
        title,
        description,
        documentation_url,
        logo_url || null,
        is_public ? 1 : 0,
        req.params.id,
        req.user.id,
      ]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Card no encontrada",
      });
    }

    // 2. Reset tags
    await connection.query(
      `DELETE FROM card_tags WHERE card_id = ?`,
      [req.params.id]
    );

    // 3. Reinsert tags
    if (tags && tags.length > 0) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");

      for (const tagName of tagArray) {
        const cleanTag = tagName.trim().toLowerCase();
        if (!cleanTag) continue;

        const [existingTag] = await connection.query(
          `SELECT id FROM tags WHERE name = ?`,
          [cleanTag]
        );

        let tagId;

        if (existingTag.length === 0) {
          const [newTag] = await connection.query(
            `INSERT INTO tags (name) VALUES (?)`,
            [cleanTag]
          );
          tagId = newTag.insertId;
        } else {
          tagId = existingTag[0].id;
        }

        await connection.query(
          `INSERT IGNORE INTO card_tags (card_id, tag_id)
           VALUES (?, ?)`,
          [req.params.id, tagId]
        );
      }
    }

    await connection.commit();

    res.json({
      success: true,
      message: "Card actualizada",
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error actualizando card",
    });

  } finally {
    connection.release();
  }
};

/* =========================
   DELETE CARD
========================= */
export const removeCard = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      DELETE FROM cards
      WHERE id = ?
      AND user_id = ?
      `,
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Card no encontrada",
      });
    }

    res.json({
      success: true,
      message: "Card eliminada",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error eliminando card",
    });
  }
};
