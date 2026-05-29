//Punto de entrada del servidor
import app from "./config/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

//Arranque del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});