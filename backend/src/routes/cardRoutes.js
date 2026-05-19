import express from "express";
import { createCard, getCards, getPublicCards, updateCard, deleteCard, getCardById } from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

//Definición de rutas protegidas de cards

router.get("/public", getPublicCards);

router.get("/", verifyToken, getCards);

router.get("/:id", verifyToken, getCardById);

router.post("/", verifyToken, createCard);

router.put("/:id", verifyToken, updateCard);

router.delete("/:id", verifyToken, deleteCard);

export default router;
