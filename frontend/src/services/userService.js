import api from "../services/api";

//Obtener los usuarios (admin)
export const getUsers = async() => {
    const res = await api.get("/admin/users");
    return res.data;
};

//Obtener perfil del usuario autenticado
export const getProfile = async() => {
    const res = await api.get("/users/profile");
    return res.data;
};

//Actualizar perfil del usuario autenticado
export const updateProfile = async (data) => {
    const res = await api.put("/users/profile", data);
    return res.data;
};

//Crear usuario con rol administrador
export const createUser = async (data) => {
    const res = await api.post("/admin/users", data);
    return res.data;
};

//Actualizar usuario con rol administrador
export const updateUser = async (id, data) => {
    const res = await api.put(`/admin/users/${id}`, data);
    return res.data;
};

//Eliminar usuario con rol administrador
export const deleteUser = async (id) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
};