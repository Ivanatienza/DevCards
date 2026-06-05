<template>
  <div class="px-4 flex justify-center">
    <div class="w-full max-w-6xl">

      <CardList :cards="cards" :readonly="true" />

      <p v-if="!cards.length" class="text-center text-gray-500 mt-6">
        {{ t("noCards") }}
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

import CardList from "../components/CardList.vue";
import { getPublicCards } from "../services/cardService";

const toast = useToast();
const { t } = useI18n();

const cards = ref([]);
const loading = ref(false);

const loadPublicCards = async () => {
  loading.value = true;

  try {
    const res = await getPublicCards();

    // backend: { success, data }
    cards.value = res.data || [];

  } catch (error) {
    toast.error(t("toastCardError"));
  } finally {
    loading.value = false;
  }
};

onMounted(loadPublicCards);
    
</script>
