//Manejo de tarjetas en varias vistas

import { ref } from "vue";
import * as CardService from "../services/cardService";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";

//Estado global compartido
const cards = ref([]);

export function useCards(){

    const loading = ref(false);
    const error = ref(null);

    const toast = useToast();
    const { t } = useI18n();

    /**
     * Obtener todas las cards del backend
     */

    const fetchCards = async() => {

        loading.value = true;

        try{
            cards.value = await CardService.getCards();

        }catch(err){

            error.value = err.message;
            toast.error(t("toastCardError"));

        }finally{
            loading.value = false;
        }
    }

    /**
     * Crear nueva tarjeta
     */

    const createCard = async (card) => {
        try{
            await CardService.createCard(card);
            await fetchCards();
            toast.success(t("toastCardCreated"));
        }catch(error){
            toast.error(t("toastCardError"));
        }
    }

    /**
     * Eliminar card por id
     */

    const deleteCard = async (id) => {
        
        try{
            await CardService.deleteCard(id);
            cards.value = cards.value.filter(c => c.id !== id);
            toast.success(t("toastCardDeleted"));
        }catch(error){
            toast.error(t("toastCardError"));
        }
    }

    return {
        cards,
        loading,
        error,
        fetchCards,
        createCard,
        deleteCard
    }
}