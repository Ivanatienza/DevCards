<template>

<div class="py-8">

  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

    <div>
      <p class="text-gray-500">{{ t("manageCards") }}</p>
    </div>

    <div class="flex items-center gap-4">
      <button class="primary-btn" @click="openCreate">
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

      <a :href="card.documentation_url" target="_blank" class="text-blue-600 hover:underline">
        {{ t("documentation") }}
      </a>

      <div class="flex gap-3 mt-4">
        <!-- CORRECCIÓN: editCard ahora abre el modal con los datos de la card -->
        <button @click="openEdit(card)" class="text-blue-500 text-sm hover:underline">
          {{ t("edit") }}
        </button>
        <button @click="confirmDelete(card)" class="text-red-500 text-sm hover:underline">
          {{ t("delete") }}
        </button>
      </div>

    </div>

  </div>

  <!--Modal Crear/Editar card -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >

    <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-xl">

      <h2 class="text-2xl font-bold mb-4">
        {{ editingCard ? t("edit") : t("create") }}
      </h2>

      <CardForm :card="editingCard" @save="handleSave" />

      <button
        @click="closeModal"
        class="mt-4 text-sm text-gray-500 hover:underline"
      >
        {{ t("cancel") }}
      </button>

    </div>

  </div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { getCards, createCard, updateCard, deleteCard } from "../services/cardService";
import CardForm from "../components/CardForm.vue";

const { t }   = useI18n();
const toast   = useToast();

const cards       = ref([]);
const loading     = ref(false);
const showModal   = ref(false);
const editingCard = ref(null);

//Cargar cards
const loadCards = async () => {
  loading.value = true;
  try {
    const res = await getCards();
    cards.value = res.data || [];
  } catch {
    toast.error(t("toastCardError"));
  } finally {
    loading.value = false;
  }
};

//Modal crear card
const openCreate = () => {
  editingCard.value = null;
  showModal.value   = true;
};

//Modal editar card
const openEdit = (card) => {
  editingCard.value = { ...card };
  showModal.value   = true;
};

const closeModal = () => {
  showModal.value   = false;
  editingCard.value = null;
};

//Actualizar card
const handleSave = async (formData) => {
  try {
    if (editingCard.value?.id) {
      await updateCard(editingCard.value.id, formData);
      toast.success(t("toastCardUpdated"));
    } else {
      await createCard(formData);
      toast.success(t("toastCardCreated"));
    }
    closeModal();
    await loadCards();
  } catch {
    toast.error(t("toastCardError"));
  }
};

//Eliminar card
const confirmDelete = async (card) => {
  if (!confirm(t("confirmDeleteCard"))) return;
  try {
    await deleteCard(card.id);
    cards.value = cards.value.filter(c => c.id !== card.id);
    toast.success(t("toastCardDeleted"));
  } catch {
    toast.error(t("toastCardError"));
  }
};

onMounted(loadCards);

</script>