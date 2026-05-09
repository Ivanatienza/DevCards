//Store de autenticación mediante Pinia
//Centraliza usuario y token en toda la app

import { defineStore } from "pinia";
import api from "../services/api";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

export const useAuthStore = defineStore('auth', {

    //Estado global
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null, //datos del usuario
        token: localStorage.getItem("token") || null //persistencia
    }),

    //Propiedades derivadas
    getters: {
        /**
         * Indica si el usuario está autenticado
         * Si hay token o no
        */
       isAuthenticated: (state) => !!state.token,
       isAdmin: (state) => state.user?.role === "admin"
    },

    //Acciones (lógica)
    actions: {
        /**
         * Login
         * Llama al backend
         * Guarda token y usuario
         */
        async login(email,password){
            const toast = useToast();
            const { t } = useI18n();

            try{
                const res = await api.post('/auth/login', {email, password})

                //Backend devuelve token y user
                this.token = res.data.token;
                this.user = res.data.user;

                //Guardamos en localStorage para persistencia
                localStorage.setItem("token", this.token);
                localStorage.setItem("user", JSON.stringify(this.user));

                toast.success(t("toastLoginSuccess"));

            }catch(error){
                toast.error(t("toastLoginError"));
                throw error;
            }
        },

        /**
         * Logout:
         * Limpia el estado
         * Borra el token
         */

        logout(){
            const toast = useToast();
            const { t } = useI18n();

            this.user = null
            this.token = null

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            toast.success(t("toastLogout"));
        }
    }
})