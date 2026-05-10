import { createRouter, createWebHistory } from "vue-router";

// Layouts
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

// Vistas
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingsView from "../views/SettingsView.vue";
import PublicCardsView from "../views/PublicCardsView.vue";
import AdminView from "../views/AdminView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [

  // Layout Auth
  {
    path: "/",
    component: AuthLayout,
    children: [

      {
        path: "login",
        component: LoginView
      },

      {
        path: "register",
        component: RegisterView
      }

    ]
  },

  // Layout principal
  {
    path: "/",
    component: MainLayout,
    children: [

      {
        path: "",
        component: HomeView
      },

      {
        path: "dashboard",
        component: DashboardView,
        meta: { requiresAuth: true }
      },

      {
        path: "profile",
        component: ProfileView,
        meta: { requiresAuth: true }
      },

      {
        path: "settings",
        component: SettingsView,
        meta: { requiresAuth: true }
      },

      {
        path: "public",
        component: PublicCardsView
      },

      {
        path: "admin",
        component: AdminView,
        meta: {
          requiresAuth: true,
          requiresAdmin: true
        }
      }

    ]
  },

  // Página no encontrada
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guards
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Comprobación autenticación usuario
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // Comprobación rol usuario administrador
  if (to.meta.requiresAdmin) {

    if (!user || user.role !== "admin") {
      return next("/");
    }
  }

  // Evitar login/register logueado
  if (
    (to.path === "/login" || to.path === "/register")
    && token
  ) {
    return next("/dashboard");
  }

  next();
});

export default router;