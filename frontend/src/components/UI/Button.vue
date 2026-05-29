<template>

<button

  :type="type"
  :disabled="disabled"
  class="px-4 py-2 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  :class="classes"
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

const classes = computed(() => {
  return {
    "bg-blue-500 hover:bg-blue-600 text-white": props.variant === "primary",
    "bg-gray-500 hover:bg-gray-600 text-white": props.variant === "secondary",
    "bg-red-500 hover:bg-red-600 text-white": props.variant === "danger"
  };
});

</script>