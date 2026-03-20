import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import cardRoutes from "../routes/cardRoutes.js";
import settingsRoutes from "../routes/settingsRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/settings", settingsRoutes);

export default app;