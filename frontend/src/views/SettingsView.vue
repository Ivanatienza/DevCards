<template>

<div class="max-w-2xl mx-auto">

  <div class="card-ui p-8 space-y-8">

    <h1 class="text-4xl font-bold">
      {{ t("settings") }}
    </h1>

    <div>

      <p class="font-semibold mb-4">
        {{ t("theme") }}
      </p>

      <div class="grid grid-cols-2 gap-4">

        <button class="secondary-btn">
          ☀️ {{ t("lightMode") }}
        </button>

        <button class="primary-btn">
          🌙 {{ t("darkMode") }}
        </button>

      </div>

    </div>

    <div>

      <p class="font-semibold mb-4">
        {{ t("language") }}
      </p>

      <select class="input">

        <option>
          Español
        </option>

        <option>
          English
        </option>

      </select>

    </div>

  </div>

</div>

</template>

<script setup>

import { useI18n } from "vue-i18n";

const { t } = useI18n();

</script>