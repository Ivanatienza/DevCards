import bcrypt from "bcrypt";

import pool from "../config/db.js";

// Obtener usuarios
export const getUsers = async(req,res) => {

  try{

    const [users] = await pool.query(

      `SELECT
        id,
        name,
        surname,
        email,
        avatar_url,
        role
      FROM users`

    );

    res.json(users);

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo usuarios"
    });

  }

};

// Obtener perfil
export const getProfile = async(req,res) => {

  try{

    const [users] = await pool.query(

      `SELECT
        id,
        name,
        surname,
        email,
        avatar_url,
        role
      FROM users
      WHERE id=?`,

      [req.user.id]

    );

    res.json(users[0]);

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo perfil"
    });

  }

};

// Actualizar perfil
export const updateProfile = async(req,res) => {

  try{

    const {
      name,
      surname,
      email,
      avatar_url
    } = req.body;

    await pool.query(

      `UPDATE users
      SET
        name=?,
        surname=?,
        email=?,
        avatar_url=?
      WHERE id=?`,

      [
        name,
        surname,
        email,
        avatar_url,
        req.user.id
      ]

    );

    res.json({
      success:true,
      message:"Perfil actualizado"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error actualizando perfil"
    });

  }

};

// Crear usuario admin
export const createUser = async(req,res) => {

  try{

    const {
      name,
      surname,
      email,
      password,
      avatar_url,
      role
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(password,10);

    await pool.query(

      `INSERT INTO users
      (
        name,
        surname,
        email,
        password,
        avatar_url,
        role
      )
      VALUES (?,?,?,?,?,?)`,

      [
        name,
        surname,
        email,
        hashedPassword,
        avatar_url || "",
        role || "user"
      ]

    );

    res.status(201).json({
      success:true,
      message:"Usuario creado"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error creando usuario"
    });

  }

};

// Editar usuario admin
export const updateUser = async(req,res) => {

  try{

    const { id } = req.params;

    const {
      name,
      surname,
      email,
      avatar_url,
      role
    } = req.body;

    await pool.query(

      `UPDATE users
      SET
        name=?,
        surname=?,
        email=?,
        avatar_url=?,
        role=?
      WHERE id=?`,

      [
        name,
        surname,
        email,
        avatar_url,
        role,
        id
      ]

    );

    res.json({
      success:true,
      message:"Usuario actualizado"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error actualizando usuario"
    });

  }

};

// Eliminar usuario
export const deleteUser = async(req,res) => {

  try{

    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({
      success:true,
      message:"Usuario eliminado"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error eliminando usuario"
    });

  }

};