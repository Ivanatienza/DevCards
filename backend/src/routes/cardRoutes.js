import express from "express";
import { 
    createCard,
    getCards,
    getpublicCards,
    editCard,
    removeCard,
} from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

//Definición de rutas protegidas de cards
router.post("/", verifyToken, createCard);
router.get("/", verifyToken, getCards);
router.get("/public", verifyToken, getpublicCards);
router.put("/:id", verifyToken, editCard);
router.delete("/:id", verifyToken, removeCard);

export default router;
