import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Usuario reactivo
const user = ref(JSON.parse(localStorage.getItem("user")) || null);

// Token reactivo
const token = ref(localStorage.getItem("token") || null);

export function useAuth() {

  const router = useRouter();

  // Login para guardar usuario y token en localStorage
  const login = (userData, jwtToken) => {
    user.value = userData;
    token.value = jwtToken;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
    router.push("/dashboard");
  };

  // Logout: redirige a /home
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/home");
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = computed(() => !!token.value);

  // Verificar si el usuario es administrador
  const isAdmin = computed(() => user.value?.role === "admin");

  // Actualizar el usuario guardado
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
    setUser
  };
}