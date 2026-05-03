<template>

<div class="px-4">

<div class="flex justify-between mb-6">
<h1 class="text-2xl">{{ t("dashboard") }}</h1>

<Button @click="show=true">
{{ t("create") }}
</Button>
</div>

<CardList :cards="cards"@edit="selected=$event;show=true"@delete="remove"/>
<Modal :show="show" @close="show=false">
<CardForm :card="selected" @save="save"/>
</Modal>

</div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { usei18n } from "vue-i18n";
import Button from "../components/UI/Button.vue";
import Modal from "../components/UI/Modal.vue";
import CardList from "../components/Cards/CardList.vue";
import CardForm from "../components/Cards/CardForm.vue";
import { getCards, createCard, updateCard, deleteCard } from "../services/cardService";

const toast = useToast();
const { t } = usei18n();

const cards = ref([]);
const show = ref(false);
const selected = ref(null);

const loadCards = async() => {
    try{
        const res = await getCards();
        cards.value = res.data;
    }catch(error){
        toast.error(t("cardsLoadError"));
    }
};

const saveCards = async(data) => {
    if(selected.value){
        await updateCard(selected.value.id.data);
        toast.success(t("cardUpdated"));
    }else{
        await createCard(data);
        toast.success(t("cardCreated"));
    }
};

show.value = false;
load();

const removeCards = async(id) => {
    await deleteCard(id);
    toast.success(t("cardDeleted"));
    load();
};

onMounted(load);

</script>