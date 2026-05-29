<template>

<div class="py-8">

  <!--Titulo-->
  <h1 class="text-3xl font-bold text-center mb-8">
    {{ t("manageCards") }}
  </h1>

  <!--Botón crear card-->
  <div class="flex justify-center mb-10">
    <Button @click="openCreate">
      + {{ t("create") }}
    </Button>
  </div>

  <!--Carga de cards-->
  <p v-if="loading" class="text-center text-gray-500">
    {{ t("loading") }}
  </p>

  <!--Sin cards-->
  <p v-else-if="!cards.length" class="text-center text-gray-500">
    {{ t("noCards") }}
  </p>

  <!--Lista de cards-->
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

      <div class="flex gap-3 mt-4">
        <button @click="openEdit(card)" class="text-blue-500 text-sm hover:underline">
          {{ t("edit") }}
        </button>

        <button @click="confirmDelete(card)" class="text-red-500 text-sm hover:underline">
          {{ t("delete") }}
        </button>
      </div>

    </div>

  </div>

  <!--Modal-->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >

    <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg shadow-xl">

      <h2 class="text-2xl font-bold mb-4 text-center">
        {{ editingCard ? t("edit") : "" }}
      </h2>

      <CardForm :card="editingCard" @save="handleSave" @cancel="closeModal"/>

    </div>

  </div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import Button from "../components/ui/Button.vue";
import CardForm from "../components/CardForm.vue";
import { getCards,createCard,updateCard,deleteCard } from "../services/cardService";

const { t } = useI18n();
const toast = useToast();

const cards = ref([]);
const loading = ref(false);
const showModal = ref(false);
const editingCard = ref(null);

//Carga de cards
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

//Modales de editar y eliminar cards
const openCreate = () => {
  editingCard.value = null;
  showModal.value = true;
};

const openEdit = (card) => {
  editingCard.value = { ...card };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingCard.value = null;
};

//Guardar las cards
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

//Eliminar cards
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