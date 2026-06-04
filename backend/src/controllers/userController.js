import pool from "../config/db.js";
import { validateEmail, validateName, validateURL } from "../utils/validates.js";

export const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, surname, email, avatar_url, role FROM users WHERE id = ?",
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, surname, email, avatar_url } = req.body;

    // Validaciones
    validateName(name);
    validateName(surname);
    validateEmail(email);

    if (avatar_url) {
      validateURL(avatar_url);
    }

    //Comprobar email duplicado
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, req.user.id]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "El email ya existe",
      });
    }

    await pool.query(
      "UPDATE users SET name=?, surname=?, email=?, avatar_url=? WHERE id=?",
      [name, surname, email, avatar_url, req.user.id]
    );

    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Error al actualizar el perfil",
    });
  }
};
