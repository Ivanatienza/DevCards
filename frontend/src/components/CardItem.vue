<template>

<div class="bg-white dark:bg-gray-800 rounded shadow p-4">

  <!-- Logo con fallback si la URL de internet falla -->
  <img
    :src="card.logo_url || defaultLogo"
    class="w-16 h-16 object-cover rounded mb-2"
    @error="(e) => e.target.src = defaultLogo"
  />

  <h3 class="font-bold">{{ card.title }}</h3>

  <p class="text-sm text-gray-500 mb-2">{{ card.description }}</p>

  <div v-if="card.tags?.length" class="flex gap-1 flex-wrap mb-2">
    <span
      v-for="tag in card.tags"
      :key="tag"
      class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
    >
      {{ tag }}
    </span>
  </div>

  <a
    v-if="card.documentation_url"
    :href="card.documentation_url"
    target="_blank"
    class="text-blue-500 text-sm"
  >
    {{ t("documentation") }}
  </a>

  <!-- Botones de editar/eliminar: solo visibles si NO es readonly -->
  <div v-if="!readonly" class="flex gap-2 mt-3">
    <button @click="emit('edit', card)" class="text-blue-500 hover:underline text-sm">
      {{ t("edit") }}
    </button>
    <button @click="emit('delete', card)" class="text-red-500 hover:underline text-sm">
      {{ t("delete") }}
    </button>
  </div>

</div>

</template>

<script setup>

import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  card: {
    type: Object,
    required: true
  },
  // Si readonly=true no se muestran los botones Editar/Eliminar
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["edit", "delete"]);

// Ruta corregida al avatar por defecto (el archivo tiene espacio en el nombre)
const defaultLogo = "/avatar usuario.png";

</script>