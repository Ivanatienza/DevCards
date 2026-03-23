import express from "express";
import { 
    createNewCard,
    getUserCards,
    getpublicCards,
    editCard,
    removeCard
} from "../controllers/cardController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", verifyToken, createNewCard);
router.get("/", verifyToken, getUserCards);
router.get("/public", verifyToken, getpublicCards);
router.put("/:id", verifyToken, editCard);
router.delete("/:id", verifyToken, removeCard);

export default router;
