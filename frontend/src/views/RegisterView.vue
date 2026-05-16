<template>

<div class="max-w-md mx-auto py-10 px-4">

  <h1 class="text-3xl font-bold mb-6">
    {{ t("register") }}
  </h1>

  <form
    class="flex flex-col gap-4"
    @submit.prevent="handleRegister"
  >

    <div>

      <input
        v-model="form.name"
        type="text"
        :placeholder="t('name')"
        class="input"
      />

      <p
        v-if="errors.name"
        class="text-red-500 text-sm"
      >
        {{ errors.name }}
      </p>

    </div>

    <div>

      <input
        v-model="form.surname"
        type="text"
        :placeholder="t('surname')"
        class="input"
      />

      <p
        v-if="errors.surname"
        class="text-red-500 text-sm"
      >
        {{ errors.surname }}
      </p>

    </div>

    <div>

      <input
        v-model="form.email"
        type="email"
        :placeholder="t('email')"
        class="input"
      />

      <p
        v-if="errors.email"
        class="text-red-500 text-sm"
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
        class="text-red-500 text-sm"
      >
        {{ errors.password }}
      </p>

    </div>

    <div>

      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm Password"
        class="input"
      />

      <p
        v-if="errors.confirmPassword"
        class="text-red-500 text-sm"
      >
        {{ errors.confirmPassword }}
      </p>

    </div>

    <Button type="submit">
      {{ t("register") }}
    </Button>

  </form>

</div>

</template>

<script setup>

import { ref } from "vue";

import { useRouter } from "vue-router";

import { useI18n } from "vue-i18n";

import { useToast } from "vue-toastification";

import { register } from "../services/authService";

import Button from "../components/ui/Button.vue";

import {
  validateRegister
} from "../utils/validators";

const router = useRouter();

const toast = useToast();

const { t } = useI18n();

const form = ref({

  name:"",
  surname:"",
  email:"",
  password:"",
  confirmPassword:""

});

const errors = ref({});

const handleRegister = async() => {

  errors.value =
    validateRegister(form.value,t);

  if(Object.keys(errors.value).length){
    return;
  }

  try{

    await register(form.value);

    toast.success(
      t("toastRegisterSuccess")
    );

    router.push("/login");

  }catch(error){

    toast.error(
      t("toastRegisterError")
    );

  }

};

</script>