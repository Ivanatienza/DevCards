import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

const createAdmin = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      ["admin@devcards.com"]
    );

    if (rows.length > 0) {
      console.log("El admin ya existe");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin123@", 10);

    await pool.query(
      `INSERT INTO users
      (name, surname, email, password, role)
      VALUES (?, ?, ?, ?, ?)`,
      [
        "Admin",
        "Root",
        "admin@devcards.com",
        hashedPassword,
        "admin"
      ]
    );

    console.log("Admin creado correctamente");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();