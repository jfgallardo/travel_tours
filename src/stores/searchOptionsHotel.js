import {defineStore} from "pinia";
import { useStorage } from '@vueuse/core';

export const useSearchOptionsHotelStore = defineStore('searchOptionsHotel', {
    state: () => ({
        entryDate: useStorage('entryDate', ''),
        departureDate: useStorage('departureDate', ''),
        destiny: useStorage('destiny', { label: '', iata: '' }),
        rooms: useStorage('rooms', 1),
        numberOfGuests: useStorage('numberOfGuests', 1)
    }),
    getters: {

    },
    actions: {

    }
})