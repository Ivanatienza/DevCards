import api from "./api";

//Login del usuario
export const login = (data) => {
    return api.post("/auth/login", data);
    return res.data;
};

//Registro del usuario
export const register = (data) => {
    return api.post("/auth/register", data);
};

//Logout del usuario
export const logout = async() => {
    return api.post("/auth/logout");
};