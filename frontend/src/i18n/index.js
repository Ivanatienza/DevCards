import { createI18n } from "vue-i18n"

//Configuración de idiomas
export default createI18n({
    locale: localStorage.getItem("lang") || "es",
    messages: {
        es: {
            "login": "Iniciar sesión",
            "register": "Registrate",
            "logout": "Salir",
            "settings": "Configuración",
            "admin": "Admin",
            "dashboard": "Inicio",
            "hello": "Hola"
        }
    },
    en : {
        "login": "Login",
        "register": "Register",
        "logout": "Logout",
        "settings": "Settings",
        "admin": "Admin",
        "dashboard": "Dashboard",
        "hello": "Hello"
    }
})