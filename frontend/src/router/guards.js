//Guards de navegación para controlar acceso a las rutas

import { useAuthStore } from "../stores/auth";

//Permiso de acceso a usuarios autenticados

export function authGuard(to, from, next){

    const auth = useAuthStore();

    if(to.meta.requiresAuth && !auth.isAuthenticated){
        return next('/login');
    }
    
    next();

}

//Evitar que usuarios logueados accedan a login/registro

export function guestGuard(to, from, next){

    const auth = useAuthStore();

    if(auth.isAuthenticated){
        return next('/');
    }
    
    next();
}