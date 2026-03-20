import { getSettings, updateSettings } from "../models/settingsModel.js";

export const getUserSettings = async(req,res) => {
    try{
        const settings = await getSettings(req.user.id)
        res.json(settings || {theme: "light", language: "es"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

export const saveSettings = async(req,res) => {
    try{
        const {theme,language} = req.body
        if(!theme || language ){
            return res.status(400).json({message: "Datos inválidos"})
        }
        await updateSettings(req.user.id,theme,language)
        res.json({messaage: "Configuración guardada."})
    }catch(error){
        res.status(500).json({error: error.message})
    }
};