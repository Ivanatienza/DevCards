import express from "express";
import {createNewTag, getTags} from "../controllers/tagController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", verifyToken, getTags);
router.post("/", verifyToken, createNewTag);

export default router;