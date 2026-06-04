import pool from "../config/db.js";
import { validateEmail, validateName, validateURL } from "../middlewares/validates.js";

/* =========================
   GET PROFILE
========================= */
export const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, surname, email, avatar_url, role
       FROM users
       WHERE id = ?`,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo perfil",
    });
  }
};

/* =========================
   UPDATE PROFILE
========================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, surname, email, avatar_url } = req.body;

    if (!name || !surname || !email) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    validateName(name);
    validateName(surname);
    validateEmail(cleanEmail);

    if (avatar_url) {
      validateURL(avatar_url);
    }

    const [existingUsers] = await pool.query(
      `SELECT id FROM users
       WHERE email = ? AND id != ?`,
      [cleanEmail, req.user.id]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "El email ya existe",
      });
    }

    await pool.query(
      `UPDATE users
       SET name = ?, surname = ?, email = ?, avatar_url = ?
       WHERE id = ?`,
      [
        name,
        surname,
        cleanEmail,
        avatar_url || null,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Perfil actualizado",
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Error al actualizar el perfil",
    });
  }
};
