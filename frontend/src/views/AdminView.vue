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

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import api from "../services/api";

const toast = useToast();
const { t } = usei18n();

const users = ref([]);

const loadUsers = async() => {
    try{
        const res = await api.get("/admin/users");
        users.value = res.data;
    }catch(error){
        toast.error("usersLoadError");
    }
};

const removeUsers = async(id) => {
    await api.delete(`/admin/users/${id}`);
    toast.success(t("userDeleted"));
    loadUsers();
};

onMounted(loadUsers);

</script>