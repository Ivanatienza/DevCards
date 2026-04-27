<template>

<button
:type="type"
class="px-4 py-2 rounded transition font-medium"
:class="{

'bg-blue-500 hover:bg-blue-600 text-white':
variant === 'primary',

'bg-gray-500 hover:bg-gray-600 text-white':
variant === 'secondary',

'bg-red-500 hover:bg-red-600 text-white':
variant === 'danger'

}">

<slot />

</button>

</template>

<script setup>
// Botón reutilizable
// variants: primary | secondary | danger

defineProps({
  variant: {
    type: String,
    default: "primary"
  },

  type: {
    type: String,
    default: "button"
  }
  
});

</script>