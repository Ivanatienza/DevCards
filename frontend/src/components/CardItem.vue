<template>
  <div class="bg-white dark:bg-gray-800 rounded shadow p-4">

    <!-- LOGO -->
    <img
      :src="logoSrc"
      class="w-16 h-16 object-cover rounded mb-2"
      @error="onImageError"
    />

    <!-- TITLE -->
    <h3 class="font-bold">{{ card.title }}</h3>

    <!-- DESCRIPTION -->
    <p class="text-sm text-gray-500 mb-2">
      {{ card.description }}
    </p>

    <!-- TAGS -->
    <div v-if="card.tags?.length" class="flex gap-1 flex-wrap mb-2">
      <span
        v-for="tag in card.tags"
        :key="tag"
        class="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
      >
        #{{ tag }}
      </span>
    </div>

    <!-- LINK -->
    <a
      v-if="card.documentation_url"
      :href="card.documentation_url"
      target="_blank"
      class="text-blue-500 text-sm"
    >
      {{ t("documentation") }}
    </a>

    <!-- ACTIONS -->
    <div v-if="!readonly" class="flex gap-2 mt-3">
      <button
        @click="emit('edit', card)"
        class="text-blue-500 hover:underline text-sm"
      >
        {{ t("edit") }}
      </button>

      <button
        @click="emit('delete', card)"
        class="text-red-500 hover:underline text-sm"
      >
        {{ t("delete") }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t } = useI18n();

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["edit", "delete"]);

/* =========================
   IMAGE HANDLING
========================= */
const defaultLogo = "/avatar-usuario.png";

const logoSrc = ref(props.card.logo_url || defaultLogo);

const onImageError = () => {
  logoSrc.value = defaultLogo;
};
  
</script>
