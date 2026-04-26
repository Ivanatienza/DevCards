//CRUD cards

import api from "./api";

//Obtener cards del usuario
export const getCards = () => {
    return api.get("/cards");
};

//Obtener cards públicas
export const getPublicCards = () => {
    return api.get("/cards/public");
};

//Obtener card por id
export const getCardById = (id) => {
    return api.get(`/cards/${id}`);
};

//Crear card
export const createCard = (data) => {
    return api.post("/cards", data);
};

//Actualizar card
export const updateCard = (id, data) => {
    return api.put(`/cards/${id}`, data);
};

//Eliminar card
export const deleteCard = (id) => {
    return api.delete(`/cards/${id}`);
};