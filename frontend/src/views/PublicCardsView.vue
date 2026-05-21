<template>

<div class="px-4">

<h1 class="text-2xl mb-6">
{{ t("publicCards") }}
</h1>

<CardList :cards="cards" :readonly="true"/>

</div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import CardList from "../components/CardList.vue";
import { getPublicCards } from "../services/cardService";

const toast = useToast();
const { t } = usei18n();
const cards = ref([]);

const loadPublicCards = async() => {
    try{
        const res = await getPublicCards();
        cards.value = res.data;
    }catch(error){
        toast.error("publicCardsLoadError");
    }
}

onMounted(loadPublicCards);

</script>