import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

export function useAuth() {
  const auth = useAuthStore();
  const { user, token, isAuthenticated, isAdmin } = storeToRefs(auth);

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login: auth.login,
    logout: auth.logout,
    updateUser: auth.updateUser,
  };
}
