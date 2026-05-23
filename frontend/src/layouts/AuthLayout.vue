<template>

<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

  <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">

    <div class="text-center mb-6">

      <router-link to="/home" class="text-2xl sm:text-3xl font-bold text-blue-500">
        DevCards
      </router-link>

      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Organiza tu documentación de desarrollo
      </p>

    </div>

    <router-view />

  </div>

</div>

</template>

<script setup>
</script>