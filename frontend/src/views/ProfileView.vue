<template>

<div class="max-w-3xl mx-auto px-4 py-10">
<h1 class="text-2xl mb-6">
{{ t("profile") }}
</h1>

<div v-if="user" class="bg-white dark:bg-gray-800 rounded-xl shadow p-6">

<img :src="user.avatar" class="w-32 h-32 rounded-full mb-4"/>

<h2 class="text-xl">{{ user.name }} {{ user.surname }}
</h2>

<p>{{ user.email }}</p>

</div>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import api from "../services/api";

const toast = useToast();
const { t } = usei18n();

const user = ref(null);

const loadProfileUser = async() => {
    try{
        const res = await api.get("/auth/me");
        user.value = res.data;
    }catch(error){
        toast.error(t("profileLoadError"));
    }
};

onMounted(loadProfileUser);

</script>