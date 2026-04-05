import { createCard, getCards, getCardById, getPublicCardsModel, updateCard, deleteCard } from "../models/cardModel.js";
import { createTag } from "../models/tagModel.js";
import { addTagToCard, removeAllTagsFromCard } from "../models/card_tagModel.js";

//Creación de cards

//Validar etiquetas
const validateTags = (tags) => {
    if(!Array.isArray(tags))
        return [];
    return [...new Set(
        tags
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0)
    )];
};

export const createNewCard = async (req,res,next) => {
    try{
        const { logo_url, title, description, documentation_url, tags, is_public } = req.body;

        if(!req.user || !req.user.id){
            return res.status(401).json({error: "Usuario no autenticado"});
        }

        if(!title){
            return res.status(401).json({error: "El titulo es obligatorio"});
        }

        const user_id = req.user.id;

        //Convertir booleano
        const isPublic = is_public === true || is_public === 1;

        const card_id = await createCard(
            user_id,
            logo_url,
            title, 
            description,
            documentation_url,
            is_public
        );

        //Tags válidas
        const validTags = validateTags(tags);

        for(let tagName of validTags){
            const tag_id = await createTag(tagName);
            if(!tag_id){
                await addTagToCard(card_id, tag_id);
            }
        }
            res.status(201).json({message: "Card creada", card_id});

    }catch(error){
        next(error);
    }
};

//Obtener las cards del usuario
export const getUserCards = async (req,res,next) => {
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const search = req.query.search || "";
        const cards = await getCards(req.user.id, search);
        res.json(cards);
        
    }catch(error){
        next(error);
    }
};

//Obtener las cards públicas del usuario
export const getpublicCards = async(req,res,next) => {
    try{
        const cards = await getPublicCardsModel();
        res.json(cards);
    }catch(error){
        next(error);
    }
};


//Editar una card
export const editCard = async (req,res,next) => {
    try{
        const { id } = req.params;
        const { logo_url,title,description,documentation_url,is_public, tags } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        //Comprobar si la card es de un usuario
        const card = await getCardById(id);

        if(!card || card.user_id !== req.user_id){
            return res.status(403).json({error: "No autorizado"});
        }

        const is_Public = is_public === true || is_public === 1;

        await updateCard(id,logo_url,title,description,documentation_url,is_public);

        if(tags && Array.isArray(tags)){
            await removeAllTagsFromCard(id);

            const validTags = validateTags(tags);

            for (let tagName of validTags){
                const tag_id = await createTag(tagName);
                if(tag_id){
                    await addTagToCard(id, tag_id);
                }
            }
        }

        res.json({message: "Card actualizada"});

    }catch(error){
        next(error);
    }
};

//Eliminar una card
export const removeCard = async(req,res,next) => {
    try{
        const {id} = req.params;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const card = await getCardById(id);

        if(!card || card.user_id !== req.user_id){
            return res.status(403).json({error: "No autorizado"});
        }

        const result = await deleteCard(id);

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Card no encontrada"})
        }

        res.json({message: "Card eliminada"});
    
    }catch(error){
        next(error);
    }
};