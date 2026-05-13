import express from "express";
import { getUsers, getProfile, updateProfile, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";

const router = express.Router();

//Definición de las rutas de usuarios con rol administrador y usuario logueado
router.get("/", verifyToken, requireAdmin, getUsers);
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/", verifyToken, requireAdmin, createUser);
router.put("/:id", verifyToken, requireAdmin, updateUser);
router.delete("/:id", verifyToken, requireAdmin, deleteUser);

export default router;