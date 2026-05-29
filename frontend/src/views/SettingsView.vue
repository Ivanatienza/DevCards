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
          :class="{ 'ring-2 ring-blue-500': !isDark }"
          @click="setTheme('light')"
        >
          ☀️ {{ t("lightMode") }}
        </button>

        <button
          class="primary-btn"
          :class="{ 'ring-2 ring-blue-300': isDark }"
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

      <select class="input w-48 text-center cursor-pointer" 
      v-model="currentLang" 
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

const { t, locale } = useI18n();
const toast = useToast();

const isDark = ref(false);
const currentLang = ref(localStorage.getItem("lang") || "es");

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

const setTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    isDark.value = true;
  } else {
    document.documentElement.classList.remove("dark");
    isDark.value = false;
  }
  localStorage.setItem("theme", theme);
  toast.success(t("toastSettingsUpdated"));
};

const setLanguage = () => {
  locale.value = currentLang.value;
  localStorage.setItem("lang", currentLang.value);
  toast.success(t("toastSettingsUpdated"));
};

</script>