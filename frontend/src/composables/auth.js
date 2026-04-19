import { ref, computed } from "vue";
import { useRouter} from "vue-router";
import { C } from "vue-router/dist/router-CWoNjPRp.mjs";

//Usuario reactivo
const user = ref(JSON.parse(localStorage.getItem("user")) || null);

//Token reactivo
const token = ref(localStorage.getItem("token") || null);

//Autenticación
export function useAuth(){

    const router = useRouter();

//Login para guardar usuario y token en localStorage
    
    const login = (userData, jwtToken) => {

        user.value = userData;
        token.value = jwtToken;

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
    }

//Redirección

    router.push("/");

//Logout

    const logout = () => {
        user.value = null;
        token.value = null;

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        router.push("/login");
    }

//Verificar si el usuario está autenticado

    const isAuthenticated = computed(() => {
        return !!token.value;
    });

//Verificar si el usuario es administrador

    const isAdmin = computed(() => {
        return user.value?.role === "admin";
    });

//Obtener el usuario

    const getUser = computed(() =>
        user.value);

//Actualizar usuario

    const setUser = (newUser) => {
        user.value = newUser;
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    return {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        getUser,
        setUser
    };
}