import pool from "../config/db.js";

// Obtener cards usuario
export const getCards = async(req,res) => {

  try{

    const [cards] = await pool.query(

      `SELECT *
      FROM cards
      WHERE user_id=?`,

      [req.user.id]

    );

    res.json(cards);

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo cards"
    });

  }

};

// Obtener públicas
export const getPublicCards = async(req,res) => {

  try{

    const [cards] = await pool.query(

      `SELECT *
      FROM cards
      WHERE is_public=1`

    );

    res.json(cards);

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo cards públicas"
    });

  }

};

// Crear
export const createCard = async(req,res) => {

  try{

    const {
      title,
      description,
      documentation_url,
      logo_url,
      is_public
    } = req.body;

    const [result] = await pool.query(

      `INSERT INTO cards
      (
        title,
        description,
        documentation_url,
        logo_url,
        is_public,
        user_id
      )
      VALUES (?,?,?,?,?,?)`,

      [
        title,
        description,
        documentation_url,
        logo_url,
        is_public,
        req.user.id
      ]

    );

    res.status(201).json({
      success:true,
      id:result.insertId
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error creando card"
    });

  }

};

// Actualizar
export const updateCard = async(req,res) => {

  try{

    const { id } = req.params;

    const {
      title,
      description,
      documentation_url,
      logo_url,
      is_public
    } = req.body;

    await pool.query(

      `UPDATE cards
      SET
        title=?,
        description=?,
        documentation_url=?,
        logo_url=?,
        is_public=?
      WHERE id=? AND user_id=?`,

      [
        title,
        description,
        documentation_url,
        logo_url,
        is_public,
        id,
        req.user.id
      ]

    );

    res.json({
      success:true,
      message:"Card actualizada"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error actualizando card"
    });

  }

};

// Eliminar
export const deleteCard = async(req,res) => {

  try{

    const { id } = req.params;

    await pool.query(

      `DELETE FROM cards
      WHERE id=? AND user_id=?`,

      [id, req.user.id]

    );

    res.json({
      success:true,
      message:"Card eliminada"
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error eliminando card"
    });

  }

};