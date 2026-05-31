//Configuración principal de Express
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Importación de rutas
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import cardRoutes from "../routes/cardRoutes.js";
import settingsRoutes from "../routes/settingsRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import tagRoutes from "../routes/tagRoutes.js";

const app = express();

//Middlewares globales
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando 🚀"
  });
});

//Definición de rutas
//app.use("/api/auth", authRoutes);
//app.use("/api/users", userRoutes);
//app.use("/api/cards", cardRoutes);
//app.use("/api/settings", settingsRoutes);
//app.use("/api/admin", adminRoutes);
//app.use("/api/tags", tagRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
