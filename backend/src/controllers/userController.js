import { getAllUsers, deleteUser} from "../models/userModel.js";

export const getUsers = async (req,res) => {
    try{
        const users = await getAllUsers();
        res.json(users);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

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

export const getMe = async(req,res) => {
    res.json(req.user);
};