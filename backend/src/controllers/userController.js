import { pool } from "../config/db.js";
import { getAllUsers, getUserById, getUserByEmail, updateUser, deleteUser} from "../models/userModel.js";
import { validateEmail, validateName } from "../middlewares/validates.js";

//Obtener los usuarios
export const getUsers = async (req,res) => {
    try{
        const users = await getAllUsers();
        res.json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Eliminar usuario
export const removeUser = async(req,res) => {
    try{
        const {id} = req.params;
        const result= await deleteUser(id);
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Usuario no encontrado."})
        }
        res.json({message: "Usuario eliminado."});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Obtener perfil del usuario logueado
export const getUserProfile = async(req,res,next) => {
    try{
        const user = await getUserById(req.user.id);
        res.json(user);
    }catch(error){
        next(error);
    }
};

//Actualizar perfil del usuario logueado
export const updateUserProfile = async(req,res,next) => {
    try{
        const {name,surname,email,avatar_url} = req.body;

        validateName(name);
        validateName(surname);
        validateEmail(email);

        await updateUser(req.user.id,name,surname,email,avatar_url);

        res.json({message: "Perfil actualizado"});
        
    }catch(error){
        next(error);
    }
};