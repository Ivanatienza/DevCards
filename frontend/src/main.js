import { createApp } from "vue";
import App from "./App.vue";

//Router del proyecto
import router from "./router";

//Traducción del proyecto (español/inglés)
import i18n from "./i18n";

//Librería de notificaciones (toast) al usuario
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"

//Estilos globales (Tailwind)
import "./index.css"

//Aplicación del tema guardado (claro/oscuro)
const theme = localStorage.getItem("theme");

if(theme === "dark"){
    document.documentElement.classList.add("dark");
}

//Creación de la app Vue
const app = createApp(App)

//Definición de plugins globales

//Rutas
app.use(router);

//Idiomas
app.use(i18n);

//Notificaciones
app.use(Toast);

//Montar la aplicación
app.mount('#app')
