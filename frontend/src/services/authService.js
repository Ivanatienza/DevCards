import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/* =========================
   REGISTER
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

/* =========================
   LOGOUT
export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
//Login del usuario
export const login = (data) => {
    return api.post("api/auth/login", data);
    return res.data;
};

//Registro del usuario
export const register = (data) => {
    return api.post("api/auth/register", data);
};

//Logout del usuario
export const logout = async() => {
    return api.post("api/auth/logout");
};
