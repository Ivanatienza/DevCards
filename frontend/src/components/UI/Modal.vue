<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg p-6 shadow-lg">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">
          <slot name="title" />
        </h2>

        <button
          @click="close"
          class="text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
      </div>

      <!-- Body -->
      <div>
        <slot />
      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
    
</script>
