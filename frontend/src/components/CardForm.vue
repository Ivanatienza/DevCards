<template>

<div class="flex flex-col gap-3">

<input v-model="title" placeholder="Título" class="border p-2 rounded dark:bg-gray-700" />

<textarea v-model="description" placeholder="Descripción" class="border p-2 rounded dark:bg-gray-700" />

<input v-model="documentation_url" placeholder="URL documentación" class="border p-2 rounded dark:bg-gray-700" />

<input v-model="logo_url" placeholder="URL Logo" class="border p-2 rounded dark:bg-gray-700" />

<input v-model="tags" placeholder="tags (vue,js,api)" class="border p-2 rounded dark:bg-gray-700" />

<label class="flex gap-2 items-center">

<input type="checkbox" v-model="is_public" />Public</label>

<button @click="submit" class="bg-blue-500 text-white p-2 rounded">Guardar</button>

</div>

</template>

<script setup>

import { ref, watch } from "vue";
import { required, minLength, isURL } from "../utils/validators";

const props = defineProps({
    card:Object
});

const emit = defineEmits(["save"]);

const title = ref("");
const description = ref("");
const documentation_url = ref("");
const logo_url = ref("");
const is_public = ref(false);
const tags = ref("");

watch(() => props.card,
(val) => {
    if(val){
        title.value = val.title;
        description.value = val.description;
        documentation_url.value = val.documentation_url;
        logo_url.value = val.logo_url;
        is_public.value = val.is_public;
        tags.value = val.tags ? val.tags.join(",") : "";
    }
    },
    { immediate: true }
);

const submit = () => {
    emit("save", {
        title: title.value,
        description: description.value,
        documentation_url: documentation_url.value,
        logo_url: logo_url.value,
        is_public: is_public.value ? 1 : 0,
        tags: tags.value.split(",").map(t => t.trim()).filter(Boolean)
    });
};

</script>