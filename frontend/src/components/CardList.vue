<template>

<div v-if="cards?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<CardItem v-for="card in cards" :key="card.id" :card="card" @edit="emit('edit', $event)" @delete="emit('delete', $event)" />

</div>

<p v-else class="text-center text-gray-500">
No hay cards disponibles.
</p>

</template>

<script setup>

import CardItem from "./CardItem.vue";

defineProps({
    cards: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(["edit", "delete"]);

</script>