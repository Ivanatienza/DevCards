import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import { validatePassword, validateEmail } from "../middlewares/validates.js";

// Registro de usuarios
export const register = async (req, res) => {
    try {
        const { name, surname, email, password, avatar_url } = req.body;

        // Normalizar email
        const cleanEmail = email.trim().toLowerCase();

        // Validaciones
        validateEmail(cleanEmail);
        validatePassword(password);

        // Comprobar si el usuario ya existe
        const [rows] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [cleanEmail]
        );

        if (rows.length > 0) {
            return res.status(400).json({ error: "El email ya existe" });
        }

        // Hash de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const userId = await createUser(
            name,
            surname,
            cleanEmail,
            hashedPassword,
            "user",
            avatar_url || null
        );

        // Crear settings por defecto
        await pool.query(
            "INSERT INTO settings (user_id, theme, language) VALUES (?, 'light', 'es')",
            [userId]
        );

        const token = generateToken({
            id: userId,
            email: cleanEmail,
            role: "user"
        });

        res.status(201).json({
            message: "Usuario creado",
            userId,
            token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login de usuarios
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const cleanEmail = email.trim().toLowerCase();

        const user = await getUserByEmail(cleanEmail);

        if (!user) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(400).json({ message: "La contraseña es incorrecta" });
        }

        const token = generateToken(user);

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
        });

        res.json({
            token,
            message: "Login exitoso",
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                avatar_url: user.avatar_url,
                role: user.role

            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout
export const logout = (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        sameSite: "strict",
    });

    res.json({ message: "Sesión cerrada correctamente." });
};