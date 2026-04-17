import { createRouter, createWebHistory } from 'vue-router';
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
    component: Dashboard
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/admin",
    component: AdminVew,
    meta: {admin: true}
  },
  {
    path: "/settings",
    component: SettingsView
  },
  {
    path: "/profile",
    component: ProfileView
  }
]

//Creación del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//Middleware de navegación
router.beforeEach((to,from,next) => {
  const user = JSON.parse(localStorage.getItem("user"))

//Middleware rol usuario administrador
if(to.meta.admin && user?.role!=="admin"){
  return next("/")
}

next()
})

export default router;