import axios from "axios"

//Configuración de Axios
const api = axios.create({
    baseURL: "http://localhost:3000/api"
})

//Interceptor para añadir el token automáticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token")

    if(!token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api