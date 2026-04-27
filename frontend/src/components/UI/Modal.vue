<template>

<div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg p-6 shadow-lg">

<div class="flex justify-between items-center mb-4">

<h2 class="text-lg font-semibold">

<slot name="title" />

</h2>

<button @click="emit('close')">
✖
</button>

</div>


<div>

<slot />

</div>

</div>

</div>

</template>

<script setup>

defineProps({
    show: Boolean
});

const emit = defineEmits(["close"]);


</script>