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
router.get("/", verifyToken, getCards);
router.get("/:id", verifyToken, getCardById);
router.post("/", verifyToken, createCard);
router.put("/:id", verifyToken, updateCard);
router.delete("/:id", verifyToken, removeCard);

export default router;
