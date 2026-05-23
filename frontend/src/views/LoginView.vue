<template>

<div>

  <h1 class="text-3xl font-bold mb-2 text-center">
    {{ t("login") }}
  </h1>

  <p class="text-gray-500 text-center mb-8">
    {{ t("welcome") }}
  </p>

  <form class="space-y-5" @submit.prevent="handleLogin">

    <div>
      <label class="block mb-2 font-medium">{{ t("email") }}</label>
      <input v-model="form.email" type="email" class="input" />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label class="block mb-2 font-medium">{{ t("password") }}</label>
      <input v-model="form.password" type="password" class="input" />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <!-- Error de servidor -->
    <p v-if="serverError" class="text-red-500 text-sm text-center">{{ serverError }}</p>

    <button class="primary-btn w-full" :disabled="loading">
      {{ loading ? t("loading") : t("login") }}
    </button>

    <p class="text-center text-sm text-gray-500">
      ¿No tienes cuenta?
      <router-link to="/auth/register" class="text-blue-500 hover:underline">
        {{ t("register") }}
      </router-link>
    </p>

  </form>

</div>

</template>

<script setup>

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../stores/auth";
import { validateLogin } from "../utils/validators";

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

const errors = ref({});
const serverError = ref("");
const loading = ref(false);

const form = reactive({
  email: "",
  password: ""
});

const handleLogin = async () => {

  errors.value = validateLogin(form, t);
  serverError.value = "";

  if (Object.keys(errors.value).length) {
    return;
  }

  loading.value = true;

  try {

    await auth.login(form.email, form.password);

    toast.success(t("toastLoginSuccess"));

    // Redirigir al dashboard tras el login exitoso
    router.push("/dashboard");

  } catch (error) {

    serverError.value = error.response?.data?.message || t("toastLoginError");
    toast.error(serverError.value);

  } finally {

    loading.value = false;

  }

};

</script>