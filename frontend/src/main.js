import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
//Importación traducción idiomas
import i18n from "./i18n";
//Importaciones notificaciones interfaz usuario
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"
//Importación framework Tailwind
import './index.css'

const app = createApp(App)
app.use(router);
app.use(i18n);
app.use(Toast);
app.mount('#app')
