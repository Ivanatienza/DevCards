<template>

<div class="bg-white dark:bg-gray-800 rounded shadow p-4">

<img :src="card.logo_url || defaultLogo" class="w-16 h-16 object-cover rounded mb-2" />

<h3 class="font-bold">
{{ card.title }}
</h3>

<p class="text-sm text-gray-500 mb-2">
{{ card.description }}
</p>

<div v-if="card.tags?.length" class="flex gap-1 flex-wrap mb-2">

<span v-for="tag in card.tags" :key="tag" class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
{{ tag }}
</span>

</div>
<a v-if ="card.documentation_url" :href="card.documentation_url" target="_blank" class="text-blue-500 text-sm" >
Ver documentación
</a>
<div class="flex gap-2 mt-3">

<button @click="emit('edit', card)" class="text-blue-500">Editar</button>

<button @click="emit('delete', card)" class="text-red-500">Eliminar</button>

</div>

</div>

</template>

<script setup>

defineProps({
    card: Object
});

const emit = defineEmits(["edit", "delete"]);

const defaultLogo = "/default-avatar.png";

</script>