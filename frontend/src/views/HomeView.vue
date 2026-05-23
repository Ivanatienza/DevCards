<template>

  <div class="max-w-5xl mx-auto px-4 py-10">

    <!-- Hero -->
    <div class="text-center mb-10">

      <h1 class="text-4xl font-bold">
        DevCards
      </h1>

      <p class="text-gray-500 dark:text-gray-400">
        {{ t("homeSubtitle") }}
      </p>

    </div>

    <!-- Usuario autenticado -->
    <div
      v-if="user"
      class="bg-white dark:bg-gray-800 shadow rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-6"
    >

      <img
        :src="user.avatar_url || '/avatar usuario.png'"
        class="w-24 h-24 rounded-full object-cover"
        @error="(e) => e.target.src = '/avatar usuario.png'"
      />

      <div class="flex-1">
        <h2 class="text-xl font-semibold">
          {{ t("welcome") }}, {{ user.name }} {{ user.surname }}
        </h2>
      </div>

      <div class="flex flex-wrap gap-2">

        <Button @click="router.push('/dashboard')">
          {{ t("dashboard") }}
        </Button>

        <Button variant="secondary" @click="router.push('/profile')">
          {{ t("profile") }}
        </Button>

        <Button variant="danger" @click="logout">
          {{ t("logout") }}
        </Button>

      </div>

    </div>

    <!-- Invitado: rutas corregidas a /auth/login y /auth/register -->
    <div v-else class="text-center flex justify-center gap-3">

      <Button @click="router.push('/auth/login')">
        {{ t("login") }}
      </Button>

      <Button variant="secondary" @click="router.push('/auth/register')">
        {{ t("register") }}
      </Button>

    </div>

  </div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import Button from "../components/ui/Button.vue";

const router = useRouter();
const toast = useToast();
const { t } = useI18n();

const user = ref(null);

onMounted(() => {
  const stored = localStorage.getItem("user");
  if (stored) {
    user.value = JSON.parse(stored);
  }
});

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  toast.success(t("toastLogout"));
  user.value = null;
  router.push("/home");
};

</script>