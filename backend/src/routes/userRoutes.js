import express from "express";
import { getUsers, removeUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/role.js";

const router = express.Router();

router.get("/", verifyToken, requireAdmin, getUsers);
router.delete("/:id", verifyToken, requireAdmin, removeUser);

export default router;