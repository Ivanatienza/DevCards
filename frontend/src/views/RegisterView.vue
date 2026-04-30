<template>
<div class="max-w-md mx-auto px-4 py-10">

<h1 class="text-2xl mb-6">{{ t("register") }}
</h1>

<input v-model ="form.name" class ="input mb-2" />
<input v-model ="form.surname" class ="input mb-2" />
<input v-model ="form.email" class ="input mb-2" />
<input type ="password" v-model = "form.password" class = "input mb-2"/>

<Button class="w-full mt-2" @click="submit">{{ t("register") }}
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

const router = useRouter();
const toast = useToast();
const { t } = usei18n();

const form = ref({
    
    name: "",
    surname: "",
    email: "",
    password: ""

});

const submit = async() => {
    try{

        await register(form.value);
        toast.success("registerSuccess");

    }catch(error){
        toast.error("registerError");
    }
};

</script>