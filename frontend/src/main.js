import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// Router
import router from "./router";

// i18n (idiomas)
import i18n from "./i18n";

// Toast notifications
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// estilos globales
import "./index.css";

/* =========================
   THEME INIT (dark/light)
========================= */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

/* =========================
   APP INIT
========================= */
const app = createApp(App);

// Pinia store
app.use(createPinia());

// Router
app.use(router);

// i18n
app.use(i18n);

// Toast config
app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
});

/* =========================
   MOUNT
========================= */
app.mount("#app");
