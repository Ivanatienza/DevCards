//CRUD cards

import api from "./api";

//Obtener cards del usuario
export const getCards = async(search = "") => {
    const res = await api.get(`/cards?search=${search}`);
    return res.data;
};

//Obtener cards públicas
export const getPublicCards = async() => {
    const res = await api.get("/cards/public");
    return res.data;
};

//Obtener card por id
export const getCardById = async(id) => {
    const res = await api.get(`/cards/${id}`);
    return res.data;
};

//Crear card
export const createCard = async(data) => {
    const res = await api.post("/cards", data);
    return res.data;
};

//Actualizar card
export const updateCard = async(id, data) => {
    const res = await api.put(`/cards/${id}`, data);
    return res.data;
};

//Eliminar card
export const deleteCard = async(id) => {
    const res = await api.delete(`/cards/${id}`);
    return res.data;
};