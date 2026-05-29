import bcrypt from "bcrypt";
import pool from "../config/db.js";

// Obtener los usuarios
export const getUsers = async (req, res) => {
  try {

    const [users] = await pool.query(
      "SELECT id, name, surname, email, role, avatar_url FROM users"
    );

    res.json({ success: true, data: users });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener usuarios" });
  }
};

// Crear usuario desde panel administrador
export const createUserAdmin = async (req, res) => {
  try {

    const { name, surname, email, password, avatar_url, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, surname, email, password, avatar_url, role) VALUES (?,?,?,?,?,?)",
      [name, surname, email, hashedPassword, avatar_url || null, role || "user"]
    );

    res.status(201).json({ success: true, message: "Usuario creado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al crear el usuario" });
  }
};

// Actualizar usuario
export const updateUserAdmin = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, surname, email, avatar_url, role } = req.body;

    await pool.query(
      `UPDATE users
       SET name = ?, surname = ?, email = ?, avatar_url = ?, role = ?
       WHERE id = ?`,
      [name, surname, email, avatar_url || null, role, id]
    );

    res.json({ success: true, message: "Usuario actualizado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al actualizar el usuario" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "El usuario no existe" });
    }

    res.json({ success: true, message: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al eliminar el usuario" });
  }
};