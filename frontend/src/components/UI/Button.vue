<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    :class="variantClass"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary"
  },
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const variantClass = computed(() => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  return variants[props.variant] || variants.primary;
});
  
</script>
