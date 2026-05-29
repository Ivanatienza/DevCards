<template>

<div v-if="cards?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

  <CardItem
    v-for="card in cards"
    :key="card.id"
    :card="card"
    :readonly="readonly"
    @edit="emit('edit', $event)"
    @delete="emit('delete', $event)"
  />

</div>

<p v-else class="text-center text-gray-500">
  {{ t("noCards") }}
</p>

</template>

<script setup>

import { useI18n } from "vue-i18n";
import CardItem from "./CardItem.vue";

const { t } = useI18n();

defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  // readonly: oculta los botones Editar/Eliminar
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["edit", "delete"]);

</script>