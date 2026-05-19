<template>

<div class="py-8">

  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

    <div>

      <h1 class="text-4xl font-bold mb-2">
        {{ t("dashboard") }}
      </h1>

      <p class="text-gray-500">
        {{ t("manageCards") }}
      </p>

    </div>

    <div class="flex items-center gap-4">

      <img
        :src="auth.user?.avatar_url || '/default-avatar.png'"
        class="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
      />

      <button class="primary-btn">
        + {{ t("create") }}
      </button>

    </div>

  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    <div
      v-for="card in cards"
      :key="card.id"
      class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 hover:scale-[1.02] transition"
    >

      <div class="flex items-center justify-between mb-4">

        <img
          :src="card.logo_url"
          class="w-14 h-14 rounded-2xl object-cover"
        />

        <span
          v-if="card.is_public"
          class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
        >
          {{ t("public") }}
        </span>

      </div>

      <h2 class="text-2xl font-bold mb-3">
        {{ card.title }}
      </h2>

      <p class="text-gray-500 mb-5 line-clamp-3">
        {{ card.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-5">

        <span
          v-for="tag in card.tags"
          :key="tag"
          class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm"
        >
          #{{ tag }}
        </span>

      </div>

      <a
        :href="card.documentation_url"
        target="_blank"
        class="text-blue-600 hover:underline"
      >
        {{ t("documentation") }}
      </a>

    </div>

  </div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";

import { useI18n } from "vue-i18n";

import { useAuthStore } from "../stores/auth";

import { getCards } from "../services/cardService";

const { t } = useI18n();

const auth = useAuthStore();

const cards = ref([]);

const loadCards = async() => {

  const res = await getCards();

  cards.value = res.data.data || [];

};

onMounted(loadCards);

</script>