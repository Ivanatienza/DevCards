<template>

<nav class="border-b bg-white dark:bg-gray-900">

<div class="container-app flex justify-between items-center py-3">

<router-link to="/" class="font-bold text-xl">DevCards
</router-link>

<div class="hidden md:flex gap-4">
<router-link to="/dashboard">{{ $t("dashboard") }}
</router-link>

<router-link to="/public">{{ $t("public") }}
</router-link>

<router-link to="/settings">{{ $t("settings") }}
</router-link>

</div>

<div class="flex items-center gap-3">

<button @click="toggleDark" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
{{ isDark ? "☀️" : "🌙" }}
</button>

<button @click="changeLang('es')">ES</button>
<button @click="changeLang('en')">EN</button>

<div v-if="user"class="flex items-center gap-2">

<span class="hidden md:block">
{{ $t("hello") }} {{ user.name }} {{ user.surname }}
</span>

<img :src="user.avatar_url || defaultAvatar" class="w-8 h-8 rounded-full object-cover" />

<button @click="logout" class="text-red-500">{{ $t("logout") }}
</button>


</div>

<div v-else class="flex gap-2">

<router-link to="/login">{{ $t("login") }}
</router-link>

<router-link to="/register">{{ $t("register") }}
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
const { locale, t } = useI18n();

const user = ref(null);
const isDark = ref(false);
const defaultAvatar = "/default-avatar.png";

//Cargar usuario

onMounted(() => {
    const stored = localStorage.getItem("user");
    if(stored) user.value = JSON.parse(stored);

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