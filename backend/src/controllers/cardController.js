import { createCard, getCards, getPublicCards, updateCard, deleteCard } from "../models/cardModel.js";
import { createTag } from "../models/tagModel.js";
import { addTagToCard } from "../models/card_tagModel.js";

export const createNewCard = async (req,res) => {
    try{
        const card = {logo_url,title, description,documentation_url,tags,is_public} = req.body
        const user_id = req.user.id
        const card_id = await createCard(
            logo_url,
            title, 
            description,
            documentation_url,
            tags,
            is_public || false
        )

        if(tags && tags.length>0){
            for (let tagName of tags){
                const tag_id = await createTag(tagName)
                if(tagId){
                    await addTagToCard(card_id, tag_id)
                }
            }
            res.status(201).json({message: "Card creada", card_id})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
};


export const getUserCards = async (req,res) => {
    try{
        const search = req.query.search || ""
        const cards = await getCards(req.user.id.search)
        res.json(cards)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};


export const getPublicCards = async(req,res) => {
    try{
        const cards = await getPublicCards()
        res.json(cards)
    }catch(error){
        res.status(500).json({error: error.message})
    }
};

export const editCard = async (req,res) => {
    const {id} = req.params
    const {logo_url,title,description,documentation_url,is_public,tags} = req.body
    await updateCard(id,logo_url,title,description,documentation_url,is_public,tags)
    res.json({message: "Card actualizada"})
};

export const removeCard = async(req,res) => {
    const {id} = req.params
    await deleteCard(id)
    res.json({message: "Card eliminada"})
};