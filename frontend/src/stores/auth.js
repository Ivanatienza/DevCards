// Store de autenticación mediante Pinia
// Centraliza usuario y token en toda la app

import { defineStore } from "pinia";

import api from "../services/api";

export const useAuthStore = defineStore("auth", {

  // Estado global
  state: () => ({

    user: JSON.parse(
      localStorage.getItem("user")
    ) || null,

    token:
      localStorage.getItem("token") || null

  }),

  // Getters
  getters: {

    // Usuario autenticado
    isAuthenticated: (state) =>
      !!state.token,

    // Usuario admin
    isAdmin: (state) =>
      state.user?.role === "admin"

  },

  // Actions
  actions: {

    /**
     * Login
     */
    async login(email,password){

      const res = await api.post(

        "/auth/login",

        {
          email,
          password
        }

      );

      this.token =
        res.data.token;

      this.user =
        res.data.user;

      // Persistencia
      localStorage.setItem(

        "token",

        this.token

      );

      localStorage.setItem(

        "user",

        JSON.stringify(this.user)

      );

    },

    /**
     * Logout
     */
    logout(){

      this.user = null;

      this.token = null;

      localStorage.removeItem("token");

      localStorage.removeItem("user");

    },

    /**
     * Actualizar usuario
     */
    updateUser(user){

      this.user = user;

      localStorage.setItem(

        "user",

        JSON.stringify(user)

      );

    }

  }

});