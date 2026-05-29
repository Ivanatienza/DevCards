<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <main class="flex-1 flex items-center justify-center p-6">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from "../components/Layout/Footer.vue";
</script>