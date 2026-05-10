<template>
<div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">

<h1 class="text-2xl font-bold mb-6 text-center">
{{ t("register") }}
</h1>

<form @submit.prevent="handleRegister" class="flex flex-col gap-4">

<div>

<input v-model="form.name" type="text" :placeholder="$t('name')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.name" class="text-red-500 text-sm mt-1">
{{ errors.name }}
</p>
</div>

<div>

<input v-model="form.surname" type="text" :placeholder="$t('surname')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.surname" class="text-red-500 text-sm mt-1">
{{ errors.surname }}
</p>

</div>

<div>

<input v-model="form.email" type="email" :placeholder="$t('email')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.email" class="text-red-500 text-sm mt-1">
{{ errors.email }}
</p>

</div>

<div>

<input v-model="form.password" type="password" :placeholder="$t('password')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.password" class="text-red-500 text-sm mt-1">
{{ errors.password }}
</p>

</div>

</form>

<input v-model ="form.name" class ="input mb-2" />
<input v-model ="form.surname" class ="input mb-2" />
<input v-model ="form.email" class ="input mb-2" />
<input type ="password" v-model = "form.password" class = "input mb-2"/>

<Button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">{{ t("register") }}
</Button>

</div>

</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import { register } from "../services/authService";
import { required, isEmail, minLength } from "../utils/validators";

const router = useRouter();
const toast = useToast();
const { t } = usei18n();

const form = ref({
    
    name: "",
    surname: "",
    email: "",
    password: ""

});

const errors = ref({});

const validateForm = () => {
    errors.value = {};

    const validations = {
        name: required(form.value.name),
        email: required(form.value.email),
        password: required(form.value.password),
    };

    for (const key in validations){
        if(validations[key] !== true){
        errors.value[key] = validations[key];
        }
    }

    return Object.keys(errors.value).length === 0;
};

const submit = async() => {
    try{

        await register(form.value);
        toast.success("registerSuccess");

    }catch(error){
        toast.error("registerError");
    }
};

</script>