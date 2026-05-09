<template>

<div class="px-4">

<h1 class="text-2xl mb-6">
{{ t("admin") }}
</h1>

<div v-for="user in users" :key="user.id" class="bg-white dark:bg-gray-800 p-4 rounded mb-2 flex justify-between">

<div>{{ user.name }} {{ user.surname }}

</div>

<Button variant="danger" @click="remove(user.id)">{{ t("delete") }}</Button>
</div>

</div>

</template>

<script setup>

import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import { deleteUser } from "../services/userService";

const toast = useToast();
const { t } = usei18n();

const removeUsers = async(id) => {
    try{
        await deleteUser(id);
        toast.success(t("toastUserDeleted"));
    }catch(error){
        toast.error(t("toastUserError"));
    }
};

</script>