import express from "express";
import { getMe, getUsers, removeUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";

const router = express.Router();

//Definición de las rutas de usuarios con rol administrador y usuario logueado
router.get("/", verifyToken, requireAdmin, getUsers);
router.get("/me", verifyToken, getMe);
router.delete("/:id", verifyToken, requireAdmin, removeUser);

export default router;