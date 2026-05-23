<template>

  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

    <Navbar />

    <main class="flex-1 w-full">

      <div class="container-app px-4 sm:px-6 lg:px-8 py-6">

        <router-view />

      </div>

    </main>

    <Footer />

  </div>

</template>

<script setup>

import Navbar from "../components/Layout/Navbar.vue";
import Footer from "../components/Layout/Footer.vue";

</script>