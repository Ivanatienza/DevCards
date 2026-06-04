import express from "express";
import { createCard, getCards, getPublicCards, getCardById, updateCard, removeCard } from "../controllers/cardController.js";

import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

/* =========================
   PUBLIC CARDS
========================= */
router.get("/public", getPublicCards);
router.get("/public/:id", getCardById);

/* =========================
   USER CARDS
========================= */
router.get("/", getCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", removeCard);

export default router;
