//Configuración del usuario

import api from "./api";

//Obtener la configuración del usuario
export const getSettings = async() => {
    const res = await api.get("/settings");
    return res.data;
};

//Actualizar la configuración del usuario
export const updateSettings = async(data) => {
    const res = await api.put("/settings", data);
    return res.data;
};