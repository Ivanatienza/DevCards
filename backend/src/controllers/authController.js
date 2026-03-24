import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

//Registro de usuarios
export const register = async(req,res) => {
    try{
        const {name,surname,email,password,avatar_url} = req.body

        //Comprobación usuario existente
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({msg: "El usuario ya existe"})
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

        res.status(201).json({msg: "Usuario creado", userId});

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