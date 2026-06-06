<template>
  <nav class="border-b bg-white dark:bg-gray-900 dark:border-gray-700">

    <div class="container-app flex justify-between items-center py-3 px-4">

      <router-link to="/home" class="font-bold text-xl text-blue-500">
        DevCards
      </router-link>

      <div class="hidden md:flex gap-6">

        <router-link to="/dashboard" class="hover:text-blue-500 transition">
          {{ $t("dashboard") }}
        </router-link>

        <router-link to="/public" class="hover:text-blue-500 transition">
          {{ $t("publicCards") }}
        </router-link>

        <router-link to="/settings" class="hover:text-blue-500 transition">
          {{ $t("settings") }}
        </router-link>

        <router-link
          v-if="user?.role === 'admin'"
          to="/admin"
          class="hover:text-blue-500 transition"
        >
          {{ $t("admin") }}
        </router-link>

      </div>

      <div class="flex items-center gap-2 md:gap-4">

        <button
          @click="toggleDark"
          class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <!-- Idioma -->
        <div class="flex items-center gap-3">

          <button
            @click="setLocale('es')"
            class="text-2xl hover:scale-110 transition"
            title="Español"
          >
            🇪🇸
          </button>

          <button
            @click="setLocale('en')"
            class="text-2xl hover:scale-110 transition"
            title="English"
          >
            🇬🇧
          </button>

        </div>

        <div v-if="user" class="flex items-center gap-2">

          <span class="hidden lg:block text-sm">
            {{ $t("hello") }} {{ user.name }}
          </span>

          <router-link to="/profile" title="Ver perfil">
            <img
              :src="user?.avatar_url || '/avatar-usuario.png'"
              class="w-8 h-8 rounded-full object-cover border hover:ring-2 hover:ring-blue-500 transition"
              @error="onAvatarError"
            />
          </router-link>

          <button
            @click="logout"
            class="text-red-500 hover:text-red-600 text-sm transition"
          >
            {{ $t("logout") }}
          </button>

        </div>

      </div>

    </div>

  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../../stores/auth";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const { locale, t } = useI18n();
const auth = useAuthStore();

const user = computed(() => auth.user);

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

const logout = () => {
  auth.logout();

  toast.success(t("logoutSuccess"));
    router.push("/");

};

const setLocale = (lang) => {
  locale.value = lang;
  localStorage.setItem("lang", lang);
};

const toggleDark = () => {
  document.documentElement.classList.toggle("dark");
  isDark.value = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

const onAvatarError = (e) => {
  e.target.src = "/avatar-usuario.png";
};
  
</script>
