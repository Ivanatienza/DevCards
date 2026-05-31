//Punto de entrada del servidor
import app from "./config/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

//Arranque del servidor
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
