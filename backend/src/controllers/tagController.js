import { createTag, getAllTags } from "../models/tagModel.js";

//Crear nueva etiqueta (tag)
export const createNewTag = async(req,res,next) => {
    try{
        const {name} = req.body;

        if(!name || !name.trim()){
            return res.status(400).json({error: "El nombre de la etiqueta es obligatorio"});
        }

        const tagId = await createTag(name);

        res.status(201).json({
            message: "Etiqueta creada",
            tag_id: tagId
        });

    }catch(error){
        next(error);
    }
};

//Obtener todas las etiquetas (tags)
export const getTags = async(req,res,next) => {
    try{
        const tags = await getAllTags();
        res.json(tags);
        
    }catch(error){
        next(error);
    }
};