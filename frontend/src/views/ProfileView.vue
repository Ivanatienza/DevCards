<template>

<div class="container-app py-8 max-w-2xl">

  <h1 class="text-3xl font-bold mb-6">
    {{ t("profile") }}
  </h1>

  <div class="card-app">

    <!-- Avatar -->

    <div class="flex flex-col items-center mb-6">

      <img
        :src="previewAvatar || form.avatar_url || '/default-avatar.png'"
        alt="avatar"
        class="w-28 h-28 rounded-full object-cover border shadow"
      />

      <label
        class="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >

        {{ t("changeAvatar") }}

        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleAvatar"
        />

      </label>

    </div>

    <!-- Form -->

    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSave"
    >

      <!-- Name -->

      <div>

        <input
          v-model="form.name"
          type="text"
          :placeholder="t('name')"
          class="input"
        />

        <p
          v-if="errors.name"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.name }}
        </p>

      </div>

      <!-- Surname -->

      <div>

        <input
          v-model="form.surname"
          type="text"
          :placeholder="t('surname')"
          class="input"
        />

        <p
          v-if="errors.surname"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.surname }}
        </p>

      </div>

      <!-- Email -->

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

      <!-- Save -->

      <Button type="submit">
        {{ t("save") }}
      </Button>

    </form>

  </div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";

import { useToast } from "vue-toastification";

import { useI18n } from "vue-i18n";

import api from "../services/api";

import Button from "../components/ui/Button.vue";

import { validateProfile } from "../utils/validators";

import { useAuthStore } from "../stores/auth";

const auth = useAuthStore();

const toast = useToast();

const { t } = useI18n();

const form = ref({

  name:"",
  surname:"",
  email:"",
  avatar_url:""

});

const previewAvatar = ref("");

const errors = ref({});

// Load profile
const loadProfile = async() => {

  try{

    const res =
      await api.get(
        "/users/profile"
      );

    form.value =
      res.data.data;

  }catch{

    toast.error(
      t("toastProfileError")
    );

  }

};

// Upload avatar
const handleAvatar = (event) => {

  const file =
    event.target.files[0];

  if(!file) return;

  // Max 2MB
  if(
    file.size >
    2 * 1024 * 1024
  ){

    toast.error(
      t("avatarMaxSize")
    );

    return;

  }

  const reader =
    new FileReader();

  reader.onload = () => {

    previewAvatar.value =
      reader.result;

    form.value.avatar_url =
      reader.result;

  };

  reader.readAsDataURL(file);

};

// Save
const handleSave = async() => {

  errors.value =
    validateProfile(
      form.value,
      t
    );

  if(
    Object.keys(errors.value).length
  ){
    return;
  }

  try{

    const res =
      await api.put(
        "/users/profile",
        form.value
      );

    auth.updateUser(
      res.data.data
    );

    toast.success(
      t("toastProfileUpdated")
    );

  }catch{

    toast.error(
      t("toastProfileError")
    );

  }

};

onMounted(loadProfile);

</script>