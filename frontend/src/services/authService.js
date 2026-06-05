import api from "./api";

/* =========================
   LOGIN
========================= */
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/* =========================
   REGISTER
========================= */
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

/* =========================
   LOGOUT
========================= */
export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
