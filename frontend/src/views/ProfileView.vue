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

import { updateUserProfile } from "../services/userService";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";

const toast = useToast();
const { t } = usei18n();

const saveProfile = async() => {
    try{
        await updateUserProfile(data);
        toast.success(t("toastProfileUpdated"));
    }catch(error){
        toast.error(t("toastProfileError"));
    }
};

</script>