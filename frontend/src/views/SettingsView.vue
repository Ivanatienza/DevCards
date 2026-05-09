<template>

<div class="max-w-md mx-auto px-4 py-10">

<h1 class="text-2xl mb-6">{{ t("settings") }}
</h1>

<select v-model="theme" class="input mb-3">
<option value="light">{{ t("light") }}</option>
<option value="dark">{{ t("dark") }}</option>
</select>

<Button @click="save">{{ t("save") }}
</Button>

</div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import { getSettings, updateSettings } from "../services/settingsService";

const toast = useToast();
const { t, locale } = usei18n();
const theme = ref("light");
const language = ref("es");

onMounted(async () => {
    const data = await getSettings();
    theme.value = data.theme;
    language.value = data.language;
});

const saveSettings = () => {
    try{
        await updateSettings({
            theme: theme.value,
            language: language.value
        });

        toast.success(t("toastSettingsUpdated"));
        
    }catch(error){
        toast.error(t("toastSettingsError"));
    }
}

</script>
