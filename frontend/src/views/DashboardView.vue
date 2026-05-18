<template>

<div class="container-app py-6">

  <!-- Header -->

  <div
    class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
  >

    <div class="flex items-center gap-4">

      <!-- Avatar -->

      <img
        :src="userAvatar"
        alt="avatar"
        class="w-16 h-16 rounded-full object-cover border shadow"
      />

      <div>

        <h1 class="text-2xl font-bold">
          {{ t("dashboard") }}
        </h1>

        <p class="text-gray-500">
          {{ t("manageCards") }}
        </p>

      </div>

    </div>

    <Button @click="openCreateModal">
      {{ t("create") }}
    </Button>

  </div>

  <!-- Loading -->

  <div
    v-if="loading"
    class="text-center py-10"
  >
    {{ t("loading") }}
  </div>

  <!-- Cards -->

  <div v-else>

    <CardList
      :cards="cards"
      @edit="openEditModal"
      @delete="handleDelete"
    />

    <p
      v-if="cards.length === 0"
      class="text-center text-gray-500 py-10"
    >
      {{ t("noCards") }}
    </p>

  </div>

  <!-- Modal -->

  <Modal
    :show="showModal"
    @close="closeModal"
  >

    <template #title>
      {{ editingId ? t("edit") : t("create") }}
    </template>

    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >

      <!-- Title -->

      <div>

        <input
          v-model="form.title"
          type="text"
          :placeholder="t('title')"
          class="input"
        />

        <p
          v-if="errors.title"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.title }}
        </p>

      </div>

      <!-- Description -->

      <div>

        <textarea
          v-model="form.description"
          :placeholder="t('description')"
          class="input min-h-[120px]"
        />

        <p
          v-if="errors.description"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.description }}
        </p>

      </div>

      <!-- Documentation URL -->

      <input
        v-model="form.documentation_url"
        type="text"
        placeholder="https://"
        class="input"
      />

      <!-- Logo URL -->

      <input
        v-model="form.logo_url"
        type="text"
        :placeholder="t('logoUrl')"
        class="input"
      />

      <!-- Tags -->

      <input
        v-model="form.tags"
        type="text"
        :placeholder="t('tagsPlaceholder')"
        class="input"
      />

      <!-- Public -->

      <label class="flex items-center gap-2">

        <input
          v-model="form.is_public"
          type="checkbox"
        />

        {{ t("publicCard") }}

      </label>

      <!-- Buttons -->

      <div class="flex flex-col md:flex-row gap-3">

        <Button type="submit">
          {{ editingId ? t("save") : t("create") }}
        </Button>

        <Button
          type="button"
          variant="secondary"
          @click="closeModal"
        >
          {{ t("cancel") }}
        </Button>

      </div>

    </form>

  </Modal>

</div>

</template>

<script setup>

import {

  ref,
  onMounted,
  computed

} from "vue";

import { useToast } from "vue-toastification";

import { useI18n } from "vue-i18n";

import { useAuthStore } from "../stores/auth";

import Button from "../components/ui/Button.vue";

import Modal from "../components/ui/Modal.vue";

import CardList from "../components/cards/CardList.vue";

import { getCards, createCard, updateCard, deleteCard } from "../services/cardService";

import { validateCard} from "../utils/validators";

const auth = useAuthStore();

const toast = useToast();

const { t } = useI18n();

const cards = ref([]);

const loading = ref(false);

const showModal = ref(false);

const editingId = ref(null);

const errors = ref({});

const form = ref({

  title:"",
  description:"",
  documentation_url:"",
  logo_url:"",
  tags:"",
  is_public:false

});

// Avatar usuario
const userAvatar = computed(() => {

  return auth.user?.avatar_url ||
    "/default-avatar.png";

});

// Obtener cards
const loadCards = async() => {

  loading.value = true;

  try{

    const res = await getCards();

    cards.value =
      res.data.data || res.data;

  }catch{

    toast.error(
      t("toastCardError")
    );

  }finally{

    loading.value = false;

  }

};

// Abrir crear
const openCreateModal = () => {

  editingId.value = null;

  errors.value = {};

  form.value = {

    title:"",
    description:"",
    documentation_url:"",
    logo_url:"",
    tags:"",
    is_public:false

  };

  showModal.value = true;

};

// Abrir editar
const openEditModal = (card) => {

  editingId.value = card.id;

  errors.value = {};

  form.value = {

    ...card,

    tags: card.tags || ""

  };

  showModal.value = true;

};

// Cerrar modal
const closeModal = () => {

  showModal.value = false;

};

// Guardar
const handleSubmit = async() => {

  errors.value =
    validateCard(
      form.value,
      t
    );

  if(
    Object.keys(errors.value).length
  ){
    return;
  }

  try{

    const payload = {

      ...form.value,

      tags: form.value.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
        .join(",")

    };

    if(editingId.value){

      await updateCard(

        editingId.value,
        payload

      );

      toast.success(
        t("toastCardUpdated")
      );

    }else{

      await createCard(payload);

      toast.success(
        t("toastCardCreated")
      );

    }

    await loadCards();

    closeModal();

  }catch{

    toast.error(
      t("toastCardError")
    );

  }

};

// Eliminar
const handleDelete = async(id) => {

  const confirmed =
    confirm(
      t("confirmDeleteCard")
    );

  if(!confirmed){
    return;
  }

  try{

    await deleteCard(id);

    cards.value =
      cards.value.filter(
        c => c.id !== id
      );

    toast.success(
      t("toastCardDeleted")
    );

  }catch{

    toast.error(
      t("toastCardError")
    );

  }

};

onMounted(loadCards);

</script>