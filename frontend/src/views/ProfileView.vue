<template>

<div class="max-w-3xl mx-auto py-10">

  <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">

    <div class="flex flex-col items-center mb-10">

      <img
        :src="avatarPreview || auth.user?.avatar_url || '/default-avatar.png'"
        class="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
      />

      <label class="mt-5 primary-btn cursor-pointer">

        {{ t("changeAvatar") }}

        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleAvatar"
        />

      </label>

      <p class="text-sm text-gray-500 mt-3">
        {{ t("avatarMaxSize") }}
      </p>

    </div>

    <form
      class="space-y-6"
      @submit.prevent="saveProfile"
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

      <button class="primary-btn w-full">
        {{ t("save") }}
      </button>

    </form>

  </div>

</div>

</template>

<script setup>

import { ref } from "vue";

import { useI18n } from "vue-i18n";

import { useAuthStore } from "../stores/auth";

const { t } = useI18n();

const auth = useAuthStore();

const avatarPreview = ref("");

const form = ref({

  name: auth.user?.name || "",

  surname: auth.user?.surname || "",

  email: auth.user?.email || ""

});

const handleAvatar = (event) => {

  const file = event.target.files[0];

  if(!file){
    return;
  }

  avatarPreview.value = URL.createObjectURL(file);

  auth.updateUser({
    ...auth.user,
    avatar_url: avatarPreview.value
  });

};

const saveProfile = () => {

  auth.updateUser({
    ...auth.user,
    ...form.value
  });

};

</script>