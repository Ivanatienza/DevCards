import { createRouter, createWebHistory } from "vue-router";

// Layouts
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

// Views
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingsView from "../views/SettingsView.vue";
import PublicCardsView from "../views/PublicCardsView.vue";
import AdminView from "../views/AdminView.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: HomeView },

      {
        path: "dashboard",
        component: DashboardView,
        meta: { requiresAuth: true },
      },

      {
        path: "profile",
        component: ProfileView,
        meta: { requiresAuth: true },
      },
      {
        path: "settings",
        component: SettingsView,
        meta: { requiresAuth: true },
      },
      {
        path: "public",
        component: PublicCardsView,
        meta: { requiresAuth: true },
      },
      {
        path: "admin",
        component: AdminView,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
    ],
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      { path: "login", component: LoginView },
      { path: "register", component: RegisterView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (to.meta.requiresAuth && !token) {
    return next("/auth/login");
  }

  if (to.meta.requiresAdmin && user?.role !== "admin") {
    return next("/dashboard");
  }

  next();
});

export default router;
