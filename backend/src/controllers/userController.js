import pool from "../config/db.js";

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
    const { name, surname, avatar_url } = req.body;

    await pool.query(
      "UPDATE users SET name=?, surname=?, avatar_url=? WHERE id=?",
      [name, surname, avatar_url, req.user.id]
    );

    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando perfil" });
  }
};