import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getUserSettings, saveSettings } from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", verifyToken, getUserSettings);
router.post("/", verifyToken, saveSettings);

export default router;