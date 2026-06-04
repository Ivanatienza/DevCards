import api from "./api";

/* =========================
   GET CARDS
========================= */
export const getCards = async (search = "") => {
  const res = await api.get(
    `/cards?search=${encodeURIComponent(search)}`
  );

  return res.data;
};

/* =========================
   GET PUBLIC CARDS
========================= */
export const getPublicCards = async () => {
  const res = await api.get("/cards/public");
  return res.data;
};

/* =========================
   GET CARD BY ID
========================= */
export const getCardById = async (id) => {
  const res = await api.get(`/cards/${id}`);
  return res.data;
};

/* =========================
   CREATE CARD
========================= */
export const createCard = async (data) => {
  const res = await api.post("/cards", data);
  return res.data;
};

/* =========================
   UPDATE CARD
========================= */
export const updateCard = async (id, data) => {
  const res = await api.put(`/cards/${id}`, data);
  return res.data;
};

/* =========================
   DELETE CARD
========================= */
export const deleteCard = async (id) => {
  const res = await api.delete(`/cards/${id}`);
  return res.data;
};
