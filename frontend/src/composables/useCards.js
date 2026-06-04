// composables/useCards.js

import { ref } from "vue";
import * as CardService from "../services/cardService";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

export function useCards() {
  const cards = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const toast = useToast();
  const { t } = useI18n();

  // Obtener cards
  const fetchCards = async (search = "") => {
    loading.value = true;
    error.value = null;

    try {
      const res = await CardService.getCards(search);
      cards.value = res.data || [];

    } catch (err) {
      error.value = err?.response?.data?.message || err.message;
      toast.error(t("toastCardError"));
    } finally {
      loading.value = false;
    }
  };

  // Crear card
  const createCard = async (card) => {
    try {
      await CardService.createCard(card);
      await fetchCards();
      toast.success(t("toastCardCreated"));
    } catch (err) {
      toast.error(err?.response?.data?.message || t("toastCardError"));
    }
  };

  // Eliminar card
  const deleteCard = async (id) => {
    try {
      await CardService.deleteCard(id);
      cards.value = cards.value.filter((c) => c.id !== id);
      toast.success(t("toastCardDeleted"));
    } catch (err) {
      toast.error(err?.response?.data?.message || t("toastCardError"));
    }
  };

  return {
    cards,
    loading,
    error,
    fetchCards,
    createCard,
    deleteCard,
  };
}
