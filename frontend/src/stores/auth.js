//Store de autenticación mediante Pinia
//Centraliza usuario y token en toda la app

import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore('auth', {

    //Estado global
    state: () => ({
        user: null, //datos del usuario
        token: localStorage.getItem("token") || null //persistencia
    }),

    //Propiedades derivadas
    getters: {
        /**
         * Indica si el usuario está autenticado
         * Si hay token o no
        */
       isAuthenticated: (state) => !!state.token
    },

    //Acciones (lógica)
    actions: {
        /**
         * Login
         * Llama al backend
         * Guarda token y usuario
         */
        async login(email,password){
            const res = await api.post('/auth/login', {email, password})

            //Backend devuelve token y user
            this.token = res.data.token;
            this.user = res.data.user;

            //Guardamos en localStorage para persistencia
            localStorage.setItem('token', this.token)
        },

        /**
         * Logout:
         * Limpia el estado
         * Borra el token
         */

        logout(){
            this.user = null
            this.token = null

            localStorage.removeItem('token')
        }
    }
})