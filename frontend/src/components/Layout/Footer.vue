<template>

<footer class="border-t mt-10 dark:bg-gray-900">

<div class="container-app py-8">

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">


<div>
<h3 class="font-bold">
DevCards
</h3>

<p class="text-sm text-gray-500">
Comparte documentación de desarrollo
</p>
</div>


<div>
<h3 class="font-semibold mb-2">
Links
</h3>

<div class="flex flex-col gap-1">

<router-link to="/">
Home
</router-link>

<router-link to="/dashboard">
Dashboard
</router-link>

<router-link to="/public">
PublicCards
</router-link>

</div>
</div>


<div>
<h3 class="font-semibold">
Proyecto DAW
</h3>

<p class="text-sm text-gray-500">
Iván Atienza Moya
</p>

<p class="text-sm">
2026
</p>

</div>

</div>

<div class="border-t mt-6 pt-4 text-center text-sm text-gray-500">
©2026 DevCards
</div>

</div>

</footer>

</template>

<script setup>

// Footer global

</script>