<template>

<div class="flex flex-col gap-4">

<input v-model="title" :type="text" :placeholder="$t('title')" class="border p-3 rounded dark:bg-gray-700 text-sm md:text-base" />

<p v-if="errors.title" class="text-red-500 text-sm">
{{ errors.title }}
</p>

<textarea v-model="description" :placeholder="$t('description')" class="border p-3 rounded dark:bg-gray-700 text-sm md:text-base" />

<p v-if="errors.description" class="text-red-500 text-sm">
{{ errors.description }}
</p>

<input v-model="documentation_url" type="text" :placeholder="$t('documentation_url')" class="border p-3 rounded dark:bg-gray-700 text-sm md:text-base" />

<p v-if="errors.documentation_url" class="text-red-500 text-sm">
{{ errors.documentation_url }}
</p>

<input v-model="logo_url" type="text" :placeholder="$t('logo_url')" class="border p-3 rounded dark:bg-gray-700 text-sm md:text-base" />

<p v-if="errors.logo_url" class="text-red-500 text-sm">
{{ errors.logo_url }}
</p>

<input v-model="tags" type="text" :placeholder="$t('tagsPlaceHolder')" class="border p-3 rounded dark:bg-gray-700 text-sm md:text-base" />

<label class="flex gap-2 items-center text-sm md:text-base">

<input type="checkbox" v-model="is_public" />{{ $t("public") }}
</label>

<button @click="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded text-sm md:text-base">
{{ $t("save") }}
</button>

</div>

</template>

<script setup>

import { ref, watch } from "vue";
import { required, isURL } from "../utils/validators";

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
const errors = ref({});

watch(() => props.card,
(val) => {
    if(val){
        title.value = val.title;
        description.value = val.description;
        documentation_url.value = val.documentation_url;
        logo_url.value = val.logo_url;
        is_public.value = val.is_public;
        tags.value = val.tags ?.join(",") || "";
    }
    },
    { immediate: true }
);

const validateForm = () => {
    errors.value = {};

    const validations = {
        title: required(title.value),
        description: required(description.value),
    documentation_url: isUrl(documentation_url.value),
        logo_url: isUrl(logo_url.value)
    };

    for (const key in validations){
        if(validations[key] !== true){
            errors.value[key] = validations[key];
        }
    }
    
    return Object.keys(errors.value).length == 0;
};

const submit = () => {

    if(!validateForm()) return;

    emit("save", {

        title: title.value,
        description: description.value,
        documentation_url: documentation_url.value,
        logo_url: logo_url.value,
        is_public: is_public.value ? 1 : 0,
        tags: tags.value.split(",").map(t => t.trim()).filter(t => t.length > 0)
    });
};

</script>