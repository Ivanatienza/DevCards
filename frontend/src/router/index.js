import { createRouter, createWebHistory } from 'vue-router';
import { createI18n } from "vue-i18n";
import { es } from "../i18n/es.json";
import { en } from "../i18n/en.json";
//Importación de vistas
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Profile from "../views/ProfileView.vue";
import Dashboard from "../views/DashboardView.vue";
import AdminVew from "../views/AdminView.vue";
import SettingsView from "../views/SettingsView.vue";
import ProfileView from '../views/ProfileView.vue';

//Definición de rutas
const routes = [
  {
    path: "/",
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: "/register",
    component: RegisterView,
  },
  {
    path: "/login",
    component: LoginView
  },
  {
    path: "/admin",
    component: AdminVew,
    meta: { requiresAuth: true,
      requiresAdmin: true }
  },
  {
    path: "/settings",
    component: SettingsView,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: { requiresAuth: true }
  }
]

//Importación de mensajes (para los idiomas)
const i18n = createI18n({
  locale = "es",

  messages: {
    es,
    en
  }

});

//Creación del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Seguridad en las rutas
router.beforeEach((to,from,next) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

//Si la ruta requiere autenticación
  if(to.meta.requiresAuth && !token){
    return next("/login");
  }

//Si la ruta requiere usuario admin
  if(to.meta.requiresAdmin){

    if(!user || user.role !=="admin"){
      return next("/");
    }
  }

//Evitar login si el usuario ya está logueado
if((to.path === "/login" || to.path === "/register") && token){
  return next ("/");
}

next();

});

export default i18n;
export default router;