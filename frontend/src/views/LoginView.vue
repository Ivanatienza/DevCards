<template>

<div class="max-w-md mx-auto px-4 py-10">

<h1 class="text-2xl mb-6">{{ t("login") }}</h1>

<input v-model="email" class="input mb-3" />
<input type="password" v-model="password" class="input mb-3" />

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

const router = useRouter();
const toast = useToast();
const { t } = usei18n();

const email = ref("");
const password = ref("");

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