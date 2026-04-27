<template>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<CardItem v-for="card in cards" :key="card.id" :card="card" @edit="emit('edit', $event)" @delete="$emit('delete', $event)" />

</div>

</template>

<script setup>

import CardItem from "./CardItem.vue";

defineProps({
    cards: Array
});

const emit = defineEmits(["edit", "delete"]);

</script>