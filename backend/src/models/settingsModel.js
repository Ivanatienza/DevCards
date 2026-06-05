import pool from "../config/db.js";

/* =========================
   GET SETTINGS
========================= */
export const getSettings = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM settings WHERE user_id = ?`,
    [user_id]
  );

  return rows.length ? rows[0] : null;
};

/* =========================
   UPDATE SETTINGS (UPSERT)
========================= */
export const updateSettings = async (user_id, theme, language) => {
  await pool.query(
    `
    INSERT INTO settings (user_id, theme, language)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      theme = VALUES(theme),
      language = VALUES(language)
    `,
    [user_id, theme, language]
  );
};
