import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getUserSettings, updateSettings } from "../controllers/settingsController.js";

const router = express.Router();

//Definición de rutas protegidas de las preferencias del usuario
router.get("/", verifyToken, getUserSettings);
router.put("/", verifyToken, updateSettings);

export default router;