import bcrypt from "bcrypt";
import pool from "../config/db.js";

/* =========================
   GET USERS
========================= */
export const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, surname, email, role, avatar_url FROM users"
    );

    res.json({
      success: true,
      data: users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios",
    });
  }
};

/* =========================
   CREATE USER (ADMIN)
========================= */
export const createUserAdmin = async (req, res) => {
  try {
    const { name, surname, email, password, avatar_url, role } = req.body;

    if (!name || !surname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const allowedRoles = ["user", "admin"];
    const finalRole = allowedRoles.includes(role) ? role : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Crear usuario
      const [result] = await connection.query(
        `INSERT INTO users (name, surname, email, password, avatar_url, role)
         VALUES (?,?,?,?,?,?)`,
        [name, surname, cleanEmail, hashedPassword, avatar_url || null, finalRole]
      );

      const userId = result.insertId;
       
      await connection.query(
        `INSERT INTO settings (user_id, theme, language)
         VALUES (?, 'light', 'es')`,
        [userId]
      );

      await connection.commit();

      return res.status(201).json({
        success: true,
        message: "Usuario creado",
      });

    } catch (error) {
      await connection.rollback();

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "El email ya está registrado",
        });
      }

      throw error;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario",
    });
  }
};

/* =========================
   UPDATE USER (ADMIN)
========================= */
export const updateUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, avatar_url, role } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const currentUser = users[0];

    const updatedName = name ?? currentUser.name;
    const updatedSurname = surname ?? currentUser.surname;
    const updatedEmail = email
      ? email.trim().toLowerCase()
      : currentUser.email;

    const updatedAvatar = avatar_url ?? currentUser.avatar_url;

    const allowedRoles = ["user", "admin"];
    const updatedRole = role ?? currentUser.role;

    if (!allowedRoles.includes(updatedRole)) {
      return res.status(400).json({
        success: false,
        message: "Rol inválido",
      });
    }

    await pool.query(
      `UPDATE users
       SET name = ?, surname = ?, email = ?, avatar_url = ?, role = ?
       WHERE id = ?`,
      [updatedName, updatedSurname, updatedEmail, updatedAvatar, updatedRole, id]
    );

    res.json({
      success: true,
      message: "Usuario actualizado",
    });

  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "El email ya está registrado",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
    });
  }
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "El usuario no existe",
      });
    }

    res.json({
      success: true,
      message: "Usuario eliminado correctamente",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
    });
  }
};
