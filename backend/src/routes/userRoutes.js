import express from "express";
import { getUserProfile, getUsers, removeUser, updateUserProfile } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";

const router = express.Router();

//Definición de las rutas de usuarios con rol administrador y usuario logueado
router.get("/", verifyToken, requireAdmin, getUsers);
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);
router.delete("/:id", verifyToken, requireAdmin, removeUser);

export default router;