<template>

<div class="py-8">

  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

    <div>
      <h1 class="text-4xl font-bold mb-2">{{ t("dashboard") }}</h1>
      <p class="text-gray-500">{{ t("manageCards") }}</p>
    </div>

    <div class="flex items-center gap-4">

      <img
        :src="auth.user?.avatar_url || '/avatar usuario.png'"
        class="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
        @error="(e) => e.target.src = '/avatar usuario.png'"
      />

      <button class="primary-btn" @click="showCreateForm = true">
        + {{ t("create") }}
      </button>

    </div>

  </div>

  <!-- Estado de carga -->
  <p v-if="loading" class="text-center text-gray-500">{{ t("loading") }}</p>

  <!-- Sin cards -->
  <p v-else-if="!cards.length" class="text-center text-gray-500">{{ t("noCards") }}</p>

  <!-- Lista de cards -->
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

    <div
      v-for="card in cards"
      :key="card.id"
      class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 hover:scale-[1.02] transition"
    >

      <div class="flex items-center justify-between mb-4">

        <img
          :src="card.logo_url || '/avatar usuario.png'"
          class="w-14 h-14 rounded-2xl object-cover"
          @error="(e) => e.target.src = '/avatar usuario.png'"
        />

        <span
          v-if="card.is_public"
          class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
        >
          {{ t("public") }}
        </span>

      </div>

      <h2 class="text-2xl font-bold mb-3">{{ card.title }}</h2>

      <p class="text-gray-500 mb-5 line-clamp-3">{{ card.description }}</p>

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

      <div class="flex gap-3 mt-4">
        <button @click="editCard(card)" class="text-blue-500 text-sm hover:underline">
          {{ t("edit") }}
        </button>
        <button @click="confirmDelete(card)" class="text-red-500 text-sm hover:underline">
          {{ t("delete") }}
        </button>
      </div>

    </div>

  </div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../stores/auth";
import { getCards, deleteCard } from "../services/cardService";

const { t } = useI18n();
const auth = useAuthStore();
const toast = useToast();

const cards = ref([]);
const loading = ref(false);
const showCreateForm = ref(false);

const loadCards = async () => {
  loading.value = true;
  try {
    const res = await getCards();
    // CORRECCIÓN: getCards() ya devuelve res.data del axios (= {success, data:[...]})
    // por lo que accedemos a .data una sola vez
    cards.value = res.data || [];
  } catch (error) {
    toast.error(t("toastCardError"));
  } finally {
    loading.value = false;
  }
};

const editCard = (card) => {
  // TODO: abrir modal de edición
  console.log("Editar card:", card);
};

const confirmDelete = async (card) => {
  if (!confirm(t("confirmDeleteCard"))) return;
  try {
    await deleteCard(card.id);
    cards.value = cards.value.filter(c => c.id !== card.id);
    toast.success(t("toastCardDeleted"));
  } catch (error) {
    toast.error(t("toastCardError"));
  }
};

onMounted(loadCards);

</script>