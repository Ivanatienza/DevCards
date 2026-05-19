<template>

<div>

  <h1 class="text-3xl font-bold mb-2 text-center">
    {{ t("login") }}
  </h1>

  <p class="text-gray-500 text-center mb-8">
    {{ t("welcomeBack") }}
  </p>

  <form
    class="space-y-5"
    @submit.prevent="handleLogin"
  >

    <div>

      <label class="block mb-2 font-medium">
        {{ t("email") }}
      </label>

      <input
        v-model="form.email"
        type="email"
        class="input"
      />

      <p
        v-if="errors.email"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.email }}
      </p>

    </div>

    <div>

      <label class="block mb-2 font-medium">
        {{ t("password") }}
      </label>

      <input
        v-model="form.password"
        type="password"
        class="input"
      />

      <p
        v-if="errors.password"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.password }}
      </p>

    </div>

    <button class="primary-btn w-full">
      {{ t("login") }}
    </button>

  </form>

</div>

</template>

<script setup>

import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import { validateLogin } from "../utils/validators";

const { t } = useI18n();

const auth = useAuthStore();

const errors = ref({});

const form = reactive({
  email:"",
  password:""
});

const handleLogin = async() => {

  errors.value = validateLogin(form, t);

  if(Object.keys(errors.value).length){
    return;
  }

  await auth.login(
    form.email,
    form.password
  );

};

</script>