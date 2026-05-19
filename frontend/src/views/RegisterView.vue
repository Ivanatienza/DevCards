<template>

<div>

  <h1 class="text-3xl font-bold mb-2 text-center">
    {{ t("register") }}
  </h1>

  <p class="text-gray-500 text-center mb-8">
    {{ t("createAccount") }}
  </p>

  <form
    class="space-y-5"
    @submit.prevent="handleRegister"
  >

    <input
      v-model="form.name"
      type="text"
      :placeholder="t('name')"
      class="input"
    />

    <input
      v-model="form.surname"
      type="text"
      :placeholder="t('surname')"
      class="input"
    />

    <input
      v-model="form.email"
      type="email"
      :placeholder="t('email')"
      class="input"
    />

    <input
      v-model="form.password"
      type="password"
      :placeholder="t('password')"
      class="input"
    />

    <input
      v-model="form.confirmPassword"
      type="password"
      :placeholder="t('confirmPassword')"
      class="input"
    />

    <button class="primary-btn w-full">
      {{ t("register") }}
    </button>

  </form>

</div>

</template>

<script setup>

import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { validateRegister } from "../utils/validators";

const { t } = useI18n();

const errors = ref({});

const form = reactive({
  name:"",
  surname:"",
  email:"",
  password:"",
  confirmPassword:""
});

const handleRegister = () => {

  errors.value = validateRegister(form, t);

};

</script>