<template>

<footer class="border-t mt-10 dark:bg-gray-900 dark:border-gray-700">

  <div class="container-app py-8 px-4">

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div>
        <h3 class="font-bold mb-2">DevCards</h3>
        <p class="text-sm text-gray-500">{{ $t("footerDescription") }}</p>
      </div>

      <div>
        <h3 class="font-semibold mb-2">{{ $t("footerLinks") }}</h3>
        <div class="flex flex-col gap-1 text-sm">
          <router-link to="/home" class="hover:text-blue-500 transition">
            Home
          </router-link>
          <router-link to="/dashboard" class="hover:text-blue-500 transition">
            {{ $t("dashboard") }}
          </router-link>
          <router-link to="/public" class="hover:text-blue-500 transition">
            {{ $t("publicCards") }}
          </router-link>
        </div>
      </div>

      <div>
        <h3 class="font-semibold mb-2">{{ $t("footerProject") }}</h3>
        <p class="text-sm text-gray-500">Iván Atienza Moya</p>
        <p class="text-sm">2026</p>
      </div>

    </div>

    <div class="border-t mt-6 pt-4 text-center text-sm text-gray-500 dark:border-gray-700">
      ©2026 DevCards
    </div>

  </div>

</footer>

</template>

<script setup>

import { useI18n } from "vue-i18n";
const { t } = useI18n();

</script>