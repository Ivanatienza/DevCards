import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Perfil del usuario autenticado
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;