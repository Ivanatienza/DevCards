import api from "./api";

//Login usuario
export const login = (data) => {
    return api.post("/auth/login", data);
};

//Registro usuario
export const register = (data) => {
    return api.post("/auth/register", data);
};