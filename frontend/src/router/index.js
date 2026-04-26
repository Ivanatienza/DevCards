import { createRouter, createWebHistory } from 'vue-router';

//Importación de vistas
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Profile from "../views/ProfileView.vue";
import Dashboard from "../views/DashboardView.vue";
import AdminVew from "../views/AdminView.vue";
import SettingsView from "../views/SettingsView.vue";
import ProfileView from '../views/ProfileView.vue';
import DashboardView from '../views/DashboardView.vue';

//Definición de rutas
const routes = [
  {
    path: "/",
    component: HomeView
  },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: "/register",
    component: RegisterView
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