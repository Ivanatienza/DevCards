import { pool } from "../config/db.js";

//Obtener los usuarios
export const getUsers = async (req,res) => {
    try{
        const [users] = await pool.query(
            "SELECT id,name,surname,email,role,avatar_url FROM users"
        );

        res.json(users);

    }catch(error){
        res.status(500).json({message: "Error al obtener usuarios"});
    }
};

//Crear usuarios
export const createUserAdmin = async(req,res) => {

    try{
        const { name, surname, email, password, role } = req.body;

        await pool.query(
            "INSERT INTO users (name,surname,email,password,role) VALUES (?,?,?,?,?)",
            [name,surname,email,password,role || "user"]
        );

        res.json({ message: "Usuario creado" });

    }catch(error){
        res.status(500).json({message: "Error al crear el usuario"});
    }
};

//Actualizar usuarios
export const updateUserAdmin = async(req,res) => {
    try{
        const { id } = req.params;
        const { name,surname,email,password,role } = req.body;

        await pool.query(
            `UPDATE users
            SET name = ?, surname = ?, email = ?, avatar_url = ?, role = ?
            WHERE id = ?`,
            [name,surname,email,password,role,id]
        );

    res.json({ message: "Usuario actualizado" });

    }catch(error){

        res.status(500).json({ message: "Error al actualizar el usuario" });

    };
}

//Eliminar usuarios
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