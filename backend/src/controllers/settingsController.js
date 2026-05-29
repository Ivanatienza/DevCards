import { getSettings, updateSettings as updateSettingsModel } from "../models/settingsModel.js";

//Obtener las preferencias del usuario
export const getUserSettings = async (req,res,next) => {
    try{
        const settings = await getSettings(req.user.id);
        res.json(settings);

    }catch(error){
        next(error);
    }
};

//Guardar las preferencias del usuario
export const updateSettings = async(req,res,next) => {
    try{
        const { theme,language } = req.body;

        await updateSettingsModel(req.user.id,theme,language);

        res.json({message: "Configuración guardada."});

    }catch(error){
        next(error);
    }
};