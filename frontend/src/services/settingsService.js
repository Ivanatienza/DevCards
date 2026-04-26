//Configuración del usuario

import api from "./api";

//Obtener la configuración del usuario
export const getSettings = () => {
    return api.get("/settings");
};

//Actualizar la configuración del usuario
export const udpateSettings = (data) => {
    return api.put("/settings", data);
};