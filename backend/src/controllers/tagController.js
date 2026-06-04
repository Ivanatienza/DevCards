import { createTag, getAllTags } from "../models/tagModel.js";

/* =========================
   CREATE TAG
========================= */
export const createNewTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "El nombre de la etiqueta es obligatorio",
      });
    }

    const cleanName = name.trim().toLowerCase();

    if (cleanName.length > 50) {
      return res.status(400).json({
        error: "La etiqueta no puede superar 50 caracteres",
      });
    }

    const tagId = await createTag(cleanName);

    res.status(201).json({
      message: "Etiqueta creada",
      tag_id: tagId,
    });

  } catch (error) {
    next(error);
  }
};

/* =========================
   GET TAGS
========================= */
export const getTags = async (req, res, next) => {
  try {
    const tags = await getAllTags();

    res.json(tags);

  } catch (error) {
    next(error);
  }
};
