<template>

<div class="px-4 flex justify-center">
    <div class="w-full max-w-6*1">
        <CardList :cards="cards" :readonly="true"/>
    </div>

</div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import CardList from "../components/CardList.vue";
import { getPublicCards } from "../services/cardService";

const toast = useToast();
const { t } = useI18n();
const cards = ref([]);

const loadPublicCards = async() => {
    try{
        const res = await getPublicCards();
        cards.value = res.data;
    }catch(error){
        toast.error(t("toastCardError"));
    }
}

onMounted(loadPublicCards);

</script>