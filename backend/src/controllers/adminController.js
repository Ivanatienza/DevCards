import { pool } from "../config/db.js";

export const getUsers = async (req,res) => {
    try{
        const [users] = await pool.query(
            "SELECT id,name,surname,email,role,avatar_url FROM users"
        )
        res.json(users);
    }catch(error){
        res.status(500).json({message: "Error al obtener usuarios"});
    }
};

export const deleteUser = async(req,res) => {
    try{
        const {id} = req.params;
        const [result] = await pool.query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({message: "El usuario no existe"});
        }

        res.json({message: "Usuario eliminado correctamente"});
    }catch(error){
        res.status(500).json({message: "Error al eliminar el usuario"});
    }
};