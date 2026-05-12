<template>

<nav class="border-b bg-white dark:bg-gray-900 dark:border-gray-700">

<div class="container-app flex justify-between items-center py-3 px-4">

<router-link to="/" class="font-bold text-xl text-blue-500">DevCards
</router-link>

<div class="hidden md:flex gap-6">
<router-link to="/dashboard">
{{ $t("dashboard") }}
</router-link>

<router-link to="/public" class="hover:text-blue-500-transition">
{{ $t("publicCards") }}
</router-link>

<router-link to="/settings" class="hover:text-blue-500-transition">
{{ $t("settings") }}
</router-link>

<router-link v-if="user?.role === 'admin'" to="/admin" class="hover:text-blue-500-transition">
{{ $t("admin") }}
</router-link>

</div>

<div class="flex items-center gap-2 md:gap-4">

<button @click="toggleDark" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">

<span v-if="isDark">
☀️
</span>

<span v-else>
🌙
</span>

</button>

<div class="flex gap-1">

<button @click="changeLang('es')" class="text-sm px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
ES
</button>

<button @click="changeLang('en')" class="text-sm px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
EN
</button>

</div>

<div v-if="user"class="flex items-center gap-2">

<span class="hidden lg:block text-sm">
{{ $t("hello") }} {{ user.name }} {{ user.surname }}
</span>

<img :src="user.avatar_url || defaultAvatar" class="w-8 h-8 rounded-full object-cover border" />

<button @click="logout" class="text-red-500 hover:text-red-600 text-sm transition">
{{ $t("logout") }}
</button>

</div>

<div v-else class="flex gap-2">

<router-link to="/login" class="text-sm hover:text-blue-500 transition">
{{ $t("login") }}
</router-link>

<router-link to="/register" class="text-sm hover:text-blue-500 transition">
{{ $t("register") }}
</router-link>

</div>

</div>

</div>

</nav>

</template>

<script setup>

//Navbar gloabl

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { locale } = useI18n();

const user = ref(null);
const isDark = ref(false);
const defaultAvatar = "/default-avatar.png";

//Cargar usuario

onMounted(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) user.value = JSON.parse(storedUser);

    isDark.value = document.documentElement.classList.contains("dark");
});

//Logout

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    user.value = null;
    router.push("/");
};

//Cambiar idioma

const changeLang = (lang) => {
    locale.value = lang;
    localStorage.setItem("lang", lang);
};

//Cambiar modo claro/oscuro

const toggleDark = () => {
    document.documentElement.classList.toggle("dark");

    isDark.value = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark": "light");

};

</script>