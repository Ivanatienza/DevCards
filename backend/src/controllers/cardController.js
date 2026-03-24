import { createCard, getCards, getPublicCardsModel, updateCard, deleteCard } from "../models/cardModel.js";
import { createTag } from "../models/tagModel.js";
import { addTagToCard, removeAllTagsFromCard } from "../models/card_tagModel.js";

//Creación de cards
export const createNewCard = async (req,res) => {
    try{
        const { logo_url, title, description, documentation_url, tags, is_public } = req.body;

        if(!req.user || !req.user.id){
            return res.status(401).json({error: "Usuario no autenticado"});
        }

        const user_id = req.user.id;

        const card_id = await createCard(
            user_id,
            logo_url,
            title, 
            description,
            documentation_url,
            is_public || false
        );

        if(tags && tags.length>0){
            for (let tagName of tags){
                const tag_id = await createTag(tagName);
                if(tag_id){
                    await addTagToCard(card_id, tag_id);
                }
            }
            res.status(201).json({message: "Card creada", card_id});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Obtener las cards del usuario
export const getUserCards = async (req,res) => {
    try{
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const search = req.query.search || ""
        const cards = await getCards(req.user.id, search);
        res.json(cards);
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Obtener las cards públicas del usuario
export const getpublicCards = async(req,res) => {
    try{
        const cards = await getPublicCardsModel();
        res.json(cards);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


//Editar una card
export const editCard = async (req,res) => {
    try{
        const { id } = req.params;
        const { logo_url,title,description,documentation_url,is_public, tags } = req.body;

        await updateCard(id,logo_url,title,description,documentation_url,is_public);

        if(tags && Array.isArray(tags)){
            await removeAllTagsFromCard(id);

            for (let tagName of tags){
                const tag_id = await createTag(tagName);
                if(tag_id){
                    await addTagToCard(id, tag_id);
                }
            }
        }

        res.json({message: "Card actualizada"});

    }catch(error){
        res.status(500).json({error: error.message});
    }
};

//Eliminar una card
export const removeCard = async(req,res) => {
    try{
        const {id} = req.params;
        const result = await deleteCard(id);

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Card no encontrada"})
        }

        res.json({message: "Card eliminada"});
    
    }catch(error){
        res.status(500).json({error: error.message});
    }
};