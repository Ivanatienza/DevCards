import pool from "../config/db.js";

/* =========================
   CREATE USER
========================= */
export const createUser = async (
  name,
  surname,
  email,
  password,
  role = "user",
  avatar_url = null
) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, surname, email, password, role, avatar_url)
     VALUES (?,?,?,?,?,?)`,
    [name, surname, email, password, role, avatar_url]
  );

  return result.insertId;
};

/* =========================
   GET USER BY ID
========================= */
export const getUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, surname, email, avatar_url, role
     FROM users WHERE id = ?`,
    [id]
  );

  return rows[0] || null;
};

/* =========================
   GET USER BY EMAIL
========================= */
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT id, name, surname, email, password, role, avatar_url
     FROM users WHERE email = ?`,
    [email]
  );

  return rows[0] || null;
};

/* =========================
   UPDATE USER
========================= */
export const updateUser = async (
  id,
  name,
  surname,
  email,
  avatar_url
) => {
  const [result] = await pool.query(
    `UPDATE users
     SET name = ?, surname = ?, email = ?, avatar_url = ?
     WHERE id = ?`,
    [name, surname, email, avatar_url, id]
  );

  return result;
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );

  return result;
};

/* =========================
   GET ALL USERS
========================= */
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, surname, email, role, avatar_url
     FROM users`
  );

  return rows;
};
