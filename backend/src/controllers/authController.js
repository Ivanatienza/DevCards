import bcrypt from "bcrypt";
import pool from "../config/db.js";
import { getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import { validatePassword, validateEmail } from "../middlewares/validates.js";

/* =========================
   REGISTER
========================= */
export const register = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { name, surname, email, password, avatar_url } = req.body;

    if (!name || !surname || !email || !password) {
      await connection.rollback();
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Validaciones
    validateEmail(cleanEmail);
    validatePassword(password);

    const [existing] = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (existing.length > 0) {
      await connection.rollback();
      return res.status(409).json({
        message: "El email ya existe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      `INSERT INTO users (name, surname, email, password, role, avatar_url)
       VALUES (?,?,?,?,?,?)`,
      [name, surname, cleanEmail, hashedPassword, "user", avatar_url || null]
    );

    const userId = result.insertId;

    await connection.query(
      `INSERT INTO settings (user_id, theme, language)
       VALUES (?, 'light', 'es')`,
      [userId]
    );

    await connection.commit();

    const token = generateToken({
      id: userId,
      email: cleanEmail,
      role: "user",
    });

    return res.status(201).json({
      message: "Usuario creado",
      token,
      user: {
        id: userId,
        name,
        surname,
        email: cleanEmail,
        avatar_url: avatar_url || null,
        role: "user",
      },
    });

  } catch (error) {
    await connection.rollback();

    return res.status(500).json({
      message: "Error en el registro",
      error: error.message,
    });

  } finally {
    connection.release();
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await getUserByEmail(cleanEmail);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatched) {
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });
    }
    
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false",
      sameSite: "strict",
      maxAge: 3600000,
    });

    return res.json({
      token,
      message: "Login exitoso",
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error en login",
      error: error.message,
    });
  }
};

/* =========================
   LOGOUT
========================= */
export const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  return res.json({
    message: "Sesión cerrada correctamente",
  });
};
