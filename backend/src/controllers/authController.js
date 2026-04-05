import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import { validatePassword } from "../middlewares/validates.js";

//Registro de usuarios
export const register = async(req,res) => {
    try{
        const {name,surname,email,password,avatar_url} = req.body

        //Comprobación de correo y contraseña
        validateEmail(email);
        validatePassword(password);

        //Comprobación usuario existente
        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );
        
        if(existingUser.length > 0){
            return res.status(400).json({error: "El email ya existe"});
        }

        //Cifrado de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Creación del usuario
        const userId = await createUser(
            name,
            surname,
            email,
            hashedPassword,
            "user",
            avatar_url || null
        );

        res.status(201).json({
            message: "Usuario creado", 
            userId: result.insertId});

    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Login de usuarios
export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const user = await getUserByEmail(email);

        //Validación de los datos del usuario
        if(!user){
            return res.status(400).json({message: "Credenciales incorrectas"});
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        
        if(!passwordMatched){
            return res.status(400).json({message: "La contraseña es incorrecta"});
        }

        //Generación del token
        const token = generateToken(user);

        res.cookie("auth_token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
        });

        res.json({
            message: "Login exitoso",
            user:{
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                avatar_url: user.avatar_url
            }
        })
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

//Logout del usuario y eliminación de cookies
export const logout = (req,res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        sameSite: "strict",
    });

    res.json({message: "Sesión cerrada correctamente."});
};