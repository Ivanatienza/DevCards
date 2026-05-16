<template>

<div class="max-w-md mx-auto py-10 px-4">

  <h1 class="text-3xl font-bold mb-6">
    {{ t("login") }}
  </h1>

  <form
    class="flex flex-col gap-4"
    @submit.prevent="handleLogin"
  >

    <div>

      <input
        v-model="form.email"
        type="email"
        :placeholder="t('email')"
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

      <input
        v-model="form.password"
        type="password"
        :placeholder="t('password')"
        class="input"
      />

      <p
        v-if="errors.password"
        class="text-red-500 text-sm mt-1"
      >
        {{ errors.password }}
      </p>

    </div>

    <Button type="submit">
      {{ t("login") }}
    </Button>

  </form>

</div>

</template>

<script setup>

import { ref } from "vue";

import { useRouter } from "vue-router";

import { useI18n } from "vue-i18n";

import { useToast } from "vue-toastification";

import { login } from "../services/authService";

import Button from "../components/ui/Button.vue";

import {
  validateLogin
} from "../utils/validators";

const router = useRouter();

const toast = useToast();

const { t } = useI18n();

const form = ref({

  email:"",
  password:""

});

const errors = ref({});

const handleLogin = async() => {

  errors.value =
    validateLogin(form.value,t);

  if(Object.keys(errors.value).length){
    return;
  }

  try{

    const res =
      await login(form.value);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success(
      t("toastLoginSuccess")
    );

    router.push("/dashboard");

  }catch(error){

    toast.error(
      t("toastLoginError")
    );

  }

};

</script>