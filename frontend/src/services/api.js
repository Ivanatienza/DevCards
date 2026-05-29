import axios from "axios";

//Configuración de Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    timeout: 10000
});

//Interceptor para añadir el token automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    
});

//Errores globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

export default api;