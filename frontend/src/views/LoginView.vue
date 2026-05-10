<template>

<div class="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">

<h1 class="text-2xl font-bold mb-6 text-center">{{ t("login") }}
</h1>
<form @submit.prevent="handleLogin" class="flex flex-col gap-4">

<div>

<input v-model="email" type="email" :placeholder="$t('email')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.email" class="text-red-500 text-sm mt-1">
{{ errors.email }}
</p>
</div>

<div>

<input v-model="password" type="password" :placeholder="$t('password')" class="border p-2 rounded w-full dark:bg-gray-700"/>

<p v-if="errors.password" class="text-red-500 text-sm mt-1">
{{ errors.password }}
</p>
</div>

</form>

<Button class="w-full" @click="submit">{{ t("login") }}
</Button>

</div>

</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Button from "../components/UI/Button.vue";
import { login } from "../services/authService";
import { isEmail, minLength } from "../utils/validators";

const router = useRouter();
const toast = useToast();
const { t } = usei18n();

const email = ref("");
const password = ref("");
const errors = ref("");

const validateForm = () => {
    errors.value = {};

    const emailValidation = isEmail(email.value);

    if(emailValidation !== true){
        errors.value.email = emailValidation;
    }

    const passwordValidation = minLength(6)(password.value);

    if(passwordValidation !== true){
        errors.value.password = passwordValidation;
    }

    return Object.keys(errors.value).length === 0;
};

const handleLogin = async() => {
    if(!validateForm()) return;
};

const submit = async() => {
    try{
        
        const res = await login({email: email.value, password: password.value});

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(t("loginSuccess"));
        router.push('/dashboard');

    }catch(error){
        toast.error(t("loginError"));
    }
};

</script>