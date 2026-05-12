<template>

<div class="container-app py-8">

<div class="flex flex-col md:flex-row md:items-center md:justify-center md:justify-between gap-4 mb-6">

<h1 class="text-2xl font-bold">
{{ t("admin") }}
</h1>

</div>

<button @click="openCreate" class="bg-blue-500 text-white px-4 py-2 rounded">
{{ $t("createUser") }}
</button>

<div v-if="loading" class="text-center py-10">
{{ $t("loading") }}
</div>

<div v-else-if="users.length === 0 " class="text-center py-10">
{{ $t("noUsers") }}
</div>

<div v-else class="overflow-x-auto">

<table class="w-full bg-white dark:bg-gray-800 rounded shadow">

<thead class="bg-gray-100 dark:bg-gray-700">

<tr>

<th class="p-3">
{{ $t("name") }}
</th>

<th class="p-3">
{{ $t("surname") }}
</th>

<th class="p-3">
{{ $t("email") }}
</th>

<th class="p-3">
{{ $t("role") }}
</th>

<th class="p-3">
{{ $t("actions") }}
</th>

</tr>

</thead>

<tbody>

<tr v-for="user in users" :key="user.id" class="border-t dark:border-gray-700">
</tr>

<td class="p-3">

<img :src="user.avatar_url || defaultAvatar " class="w-10 h-10 rounded-full-object-cover" />

</td>

<td class="p-3">
{{ (user.name) }}
</td>

<td class="p-3">
{{ user.surname }}
</td>

<td class="p-3">
{{ user.email }}
</td>

<td class="p-3">

<span class="px-2 py-1 rounded text-xs" :class="user.role === 'admin'? 'bg-red-500 text-white' :'bg-gray-300 dark:bg-gray-600'">
{{ user.role }}
</span>

</td>

<td class="p-3 flex gap-2">

<button @click="openEdit(user)" class="text-blue-500">
{{ $t("edit") }}
</button>

<button @click="removeUser(user.id)" class="text-red-500">
{{ $t("delete")}}
</button>

</td>

</tbody>

</table>

</div>

</div>

<Modal :show="showModal" @close="closeModal">

<template #title>

{{ editingUser ? $t("editUser") :$t("createUser") }}

</template>

<div>

<input v-model="form.name" type="text" :placeholder="$t('name')" class="border p-2 rounded dark:bg-gray-700"/>

<p v-if="errors.name" class="text-red-500 text-sm mt-1">
{{ errors.name }}
</p>

</div>

<div>

<input v-model="form.surname" type="text" :placeholder="$t('surname')" class="border p-2 rounded dark:bg-gray-700"/>

<p v-if="errors.surname" class="text-red-500 text-sm mt-1">
{{ errors.surname }}
</p>

</div>

<div>

<input v-model="form.email" type="text" :placeholder="$t('email')" class="border p-2 rounded dark:bg-gray-700"/>

<p v-if="errors.email" class="text-red-500 text-sm mt-1">
{{ errors.email }}
</p>

</div>

<div v-if="!editingUser">

<input v-model="form.password" type="password" :placeholder="$t('password')" class="border p-2 rounded dark:bg-gray-700"/>

<p v-if="errors.password" class="text-red-500 text-sm mt-1">
{{ errors.password }}
</p>

</div>

<div>

<select v-model="form.role" class="border p-2 rounded dark:bg-gray-700">

<option value="user">
User
</option>

<option value="admin">
Admin
</option>

</select>

</div>

<div class="flex justify-end gap-2">

<button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">
{{ $t("cancel") }}
</button>

<button @click="saveUser" class="bg-blue-500 text-white px-4 py-2 rounded">
{{ $t("save") }}
</button>

</div>

</Modal>

</template>

<script setup>

import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import Modal from "../components/UI/Modal.vue";
import { required, isEmail, minLength } from "../utils/validators";
import api from "../services/api";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { onMounted } from "vue";

const toast = useToast();
const { t } = usei18n();
const users = ref([]);
const loading = ref(false);
const showModal = ref(false);
const editingUser = ref(null);
const defaultAvatar = "/DevCards/frontend/public/avatar usuario.png";


const form = ref({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "user"
});

const loadUsers = async() => {
    loading.value = true;

    try{
        const res = await getUsers();
        users.value = res.data;
    }catch(error){
        toast.error($t("usersLoadError"));
    }finally{
        loading.value = false;
    }
};

onMounted(loadUsers);

const openCreate = () => {
    editingUser.value = null;

    form.value = {
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "user"
    }

    showModal.value = true;
};

const openEdit = () => {
    editingUser.value = user;

    form.value = {
        ...user
    };

    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveUser = async() => {
    try{
        if(editingUser.value){
            await updateUser(editingUser.value.id, form.value);
            toast.success($t("toastUserUpdated"));
        }else{
            await createUser(form.value);
            toast.success($t("toastUserCreated"));
        }

        closeModal();

        loadUsers();

    }catch(error){
        toast.error("Error guardando el usuario");
    }
};

const removeUser = async(id) => {
    try{
        await deleteUser(id);
        toast.success($t("toastUserDeleted"));
        loadUsers();
    }catch(error){
        toast.error("Error al eliminar el usuario");
    }
};

</script>