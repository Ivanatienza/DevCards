<template>

<!--Estilo global de la aplicación-->
<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

<!--Barra de navegación global (se muestra en todas las vistas)-->
<Navbar />

<!--Contenido dinámico según la ruta-->
<main class="flex-1">
<router-view />
</main>

<!--Pie de página global-->
<Footer />

</div>

</template>

<script setup>

//Barra de navegación reutilizable
import Navbar from "@/components/Layout/Navbar.vue";

//Pie de página reutilizable
import Footer from "@/components/Layout/Footer.vue";

</script>