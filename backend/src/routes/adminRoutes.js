import express from "express";
import { getUsers, deleteUser } from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";

const router = express.Router();

//Definición de las rutas de los usuarios con rol administrador
router.get("/users", verifyToken, requireAdmin, getUsers);
router.delete("/users/:id", verifyToken, requireAdmin, deleteUser);

export default router;