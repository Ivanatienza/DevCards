//Manejo de tarjetas en varias vistas

import { ref } from "vue";
import api from "../services/api";

//Estado global compartido
const cards = ref([]);

export function useCards(){
    const loading = ref(false);
    const error = ref(null);

    /**
     * Obtener todas las cards del backend
     */

    async function fetchCards(){
        loading.value = true

        try{
            const res = await api.get('/cards');

            //Backend devuelve { success, data }
            cards.value = res.data.data

        }catch(error){
            error.value = error;
        }finally{
            loading.value = false
        }
    }

    /**
     * Crear nueva tarjeta
     */

    async function createCard(){
            const res = await api.post('/cards', card);

            //Añadir al estado local
            cards.value.push(res.data.data);
    }

    /**
     * Eliminar card por id
     */

    async function deleteCard(id){
        await api.delete(`/cards/${id}`)

        cards.value = cards.value.filter(c => c.id !== id)
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