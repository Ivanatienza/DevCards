//Conexión a la base de datos MySQL
import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT

    waitForConnections: true,
    connectionLimit: 10,
    charset: "utf8mb4"
});

// Función para verificar conexión al iniciar la app
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("Conexión a la base de datos establecida correctamente");

    connection.release();
  } catch (error) {

    console.error("Error al conectar con la base de datos:");
    console.error(error.message);

  }
};

export default pool;
