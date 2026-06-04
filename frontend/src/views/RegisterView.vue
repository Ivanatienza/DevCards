<template>
  <div>
    <h1 class="text-3xl font-bold mb-2 text-center">
      {{ t("createAccount") }}
    </h1>

    <form class="space-y-5" @submit.prevent="handleRegister">

      <div>
        <input v-model="form.name" type="text" :placeholder="t('name')" class="input" />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <input v-model="form.surname" type="text" :placeholder="t('surname')" class="input" />
        <p v-if="errors.surname" class="text-red-500 text-sm mt-1">
          {{ errors.surname }}
        </p>
      </div>

      <div>
        <input v-model="form.email" type="email" :placeholder="t('email')" class="input" />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <input v-model="form.password" type="password" :placeholder="t('password')" class="input" />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">
          {{ errors.password }}
        </p>
      </div>

      <div>
        <input v-model="form.confirmPassword" type="password" :placeholder="t('confirmPassword')" class="input" />
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <p v-if="serverError" class="text-red-500 text-sm text-center">
        {{ serverError }}
      </p>

      <button class="primary-btn w-full" :disabled="loading">
        {{ loading ? t("loading") : t("register") }}
      </button>

      <p class="text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?
        <router-link to="/auth/login" class="text-blue-500 hover:underline">
          {{ t("login") }}
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
import { register as registerService } from "../services/authService";
import { validateRegister } from "../utils/validators";

const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const auth = useAuthStore();

const errors = ref({});
const serverError = ref("");
const loading = ref(false);

const form = reactive({
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: ""
});

const handleRegister = async () => {
  errors.value = validateRegister(form, t);
  serverError.value = "";

  if (Object.keys(errors.value).length) return;

  loading.value = true;

  try {
    const res = await registerService({
      name: form.name,
      surname: form.surname,
      email: form.email,
      password: form.password
    });

    auth.login(form.email, form.password);

    toast.success(t("toastRegisterSuccess"));

    router.push("/dashboard");

  } catch (error) {
    serverError.value =
      error?.response?.data?.message || t("toastRegisterError");

    toast.error(serverError.value);
  } finally {
    loading.value = false;
  }
};
  
</script>
