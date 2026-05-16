import express from "express";
import { 
    createCard,
    getCards,
    getPublicCards,
    editCard,
    removeCard,
    getCardById
} from "../controllers/cardController.js";

import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

//Definición de rutas protegidas de cards
router.post("/", verifyToken, createCard);
router.get("/", verifyToken, getCards);
router.get("/:id", verifyToken, getCardById);
router.get("/public", getPublicCards);
router.put("/:id", verifyToken, editCard);
router.delete("/:id", verifyToken, removeCard);

export default router;
