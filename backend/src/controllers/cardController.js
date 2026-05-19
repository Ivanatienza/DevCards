import pool from "../config/db.js";

export const getCards = async(req,res) => {

  try{

    const [cards] = await pool.query(
      `
      SELECT
        c.*,
        GROUP_CONCAT(t.name) AS tags
      FROM cards c
      LEFT JOIN card_tags ct
        ON c.id = ct.card_id
      LEFT JOIN tags t
        ON ct.tag_id = t.id
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.created_at DESC
      `,
      [req.user.id]
    );

    const formatted = cards.map(card => ({
      ...card,
      tags: card.tags
        ? card.tags.split(",")
        : []
    }));

    res.json({
      success:true,
      data:formatted
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo cards"
    });

  }

};

export const getPublicCards = async(req,res) => {

  try{

    const [cards] = await pool.query(
      `
      SELECT
        c.*,
        GROUP_CONCAT(t.name) AS tags
      FROM cards c
      LEFT JOIN card_tags ct
        ON c.id = ct.card_id
      LEFT JOIN tags t
        ON ct.tag_id = t.id
      WHERE c.is_public = 1
      GROUP BY c.id
      ORDER BY c.created_at DESC
      `
    );

    const formatted = cards.map(card => ({
      ...card,
      tags: card.tags
        ? card.tags.split(",")
        : []
    }));

    res.json({
      success:true,
      data:formatted
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo cards públicas"
    });

  }

};

export const getCardById = async(req,res) => {

  try{

    const [cards] = await pool.query(
      `
      SELECT *
      FROM cards
      WHERE id = ?
      AND user_id = ?
      `,
      [req.params.id, req.user.id]
    );

    if(cards.length === 0){

      return res.status(404).json({
        success:false,
        message:"Card no encontrada"
      });

    }

    res.json({
      success:true,
      data:cards[0]
    });

  }catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error obteniendo card"
    });

  }

};

export const createCard = async(req,res) => {

  const connection = await pool.getConnection();

  try{

    await connection.beginTransaction();

    const {
      title,
      description,
      documentation_url,
      logo_url,
      is_public,
      tags
    } = req.body;

    const [result] = await connection.query(
      `
      INSERT INTO cards
      (
        title,
        description,
        documentation_url,
        logo_url,
        is_public,
        user_id
      )
      VALUES (?,?,?,?,?,?)
      `,
      [
        title,
        description,
        documentation_url,
        logo_url,
        is_public,
        req.user.id
      ]
    );

    const cardId = result.insertId;

    if(tags){

      const tagArray = Array.isArray(tags)
        ? tags
        : tags.split(",");

      for(const tagName of tagArray){

        const cleanTag = tagName.trim();

        if(!cleanTag){
          continue;
        }

        let [tag] = await connection.query(
          `SELECT id FROM tags WHERE name = ?`,
          [cleanTag]
        );

        let tagId;

        if(tag.length === 0){

          const [newTag] = await connection.query(
            `INSERT INTO tags (name) VALUES (?)`,
            [cleanTag]
          );

          tagId = newTag.insertId;

        }else{

          tagId = tag[0].id;

        }

        await connection.query(
          `
          INSERT IGNORE INTO card_tags
          (card_id, tag_id)
          VALUES (?,?)
          `,
          [cardId, tagId]
        );

      }

    }

    await connection.commit();

    res.status(201).json({
      success:true,
      id:cardId
    });

  }catch(error){

    await connection.rollback();

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Error creando card"
    });

  }finally{

    connection.release();

  }

};