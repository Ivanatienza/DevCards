import { defineStore } from "pinia";
import { login as loginService, logout as logoutService } from "../services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {

    // LOGIN
    async login(email, password) {
      try {
        const data = await loginService({ email, password });

        this.token = data.token;
        this.user = data.user;

        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        return data;
      } catch (error) {
        throw error;
      }
    },

    // LOGOUT
    async logout() {
      try {
        await logoutService();
      } catch (error) {
        // incluso si falla backend, limpiamos frontend igual
        console.warn("Logout error:", error);
      }

      this.user = null;
      this.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    updateUser(partialUser) {
      if (!this.user) return;

      this.user = {
        ...this.user,
        ...partialUser,
      };

      localStorage.setItem("user", JSON.stringify(this.user));
    },
  },
});
