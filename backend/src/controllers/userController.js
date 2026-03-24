import { pool } from "../config/db.js";
import { getAllUsers, deleteUser} from "../models/userModel.js";

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

//Obtener datos del usuario logueado
export const getMe = async(req,res) => {
    try{
        const userId = req.user.id;
        const [rows] = await pool.query(
            "SELECT id,name,email,role FROM users WHERE id = ?", [userId]
        );

        if(rows.length === 0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.json(rows[0]);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};