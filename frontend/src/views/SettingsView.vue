<template>
  <div class="max-w-2xl mx-auto">
    <div class="card-ui p-8 space-y-8">

      <!-- Tema -->
      <div>
        <p class="font-semibold mb-4 text-center">
          {{ t("theme") }}
        </p>

        <div class="grid grid-cols-2 gap-4">

          <button
            class="secondary-btn"
            :class="{ 'ring-2 ring-blue-500': theme === 'light' }"
            @click="setTheme('light')"
          >
            ☀️ {{ t("lightMode") }}
          </button>

          <button
            class="primary-btn"
            :class="{ 'ring-2 ring-blue-300': theme === 'dark' }"
            @click="setTheme('dark')"
          >
            🌙 {{ t("darkMode") }}
          </button>

        </div>
      </div>

      <!-- Idioma -->
      <div class="flex flex-col items-center">

        <p class="font-semibold mb-4 text-center">
          {{ t("language") }}
        </p>

        <select
          class="input w-48 text-center cursor-pointer"
          v-model="language"
          @change="setLanguage"
        >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "vue-toastification";
import { getSettings, updateSettings } from "../services/settingsService";

const { t, locale } = useI18n();
const toast = useToast();

const theme = ref("light");
const language = ref("es");

// cargar settings desde backend
const loadSettings = async () => {
  try {
    const res = await getSettings();

    const data = res;

    theme.value = data.theme || "light";
    language.value = data.language || "es";

    applyTheme(theme.value);
    locale.value = language.value;

  } catch (err) {
    toast.error(t("toastSettingsError"));
  }
};

const applyTheme = (t) => {
  document.documentElement.classList.toggle("dark", t === "dark");
};

const setTheme = async (newTheme) => {
  theme.value = newTheme;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);

  try {
    await updateSettings({
      theme: newTheme,
      language: language.value
    });

    toast.success(t("toastSettingsUpdated"));
  } catch (err) {
    toast.error(t("toastSettingsError"));
  }
};

const setLanguage = async () => {
  locale.value = language.value;

  try {
    await updateSettings({
      theme: theme.value,
      language: language.value
    });

    localStorage.setItem("lang", language.value);

    toast.success(t("toastSettingsUpdated"));
  } catch (err) {
    toast.error(t("toastSettingsError"));
  }
};

onMounted(loadSettings);
  
</script>
