import { getAllUsers, deleteUser} from "../models/userModel.js";

export const getUsers = async(req,res) => {
    try{
        const users = await getAllUsers()
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

export const removeUser = async(req,res) => {
    try{
        const {id} = req.params
        await deleteUser(id)
        res.json({message: "Usuario eliminado."})
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

export const getMe = async(req,res) => {
    res.json(req.user)
};