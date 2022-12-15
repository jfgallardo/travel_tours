import {acceptHMRUpdate, defineStore} from "pinia";
import {useStorage} from '@vueuse/core';
import {useSearchOptionsVooStore} from "@/stores/searchOptionsVoo";

export const useSearchOptionsHotelStore = defineStore('searchOptionsHotel', {
    state: () => ({
        entryDate: useStorage('entryDate', ''),
        departureDate: useStorage('departureDate', ''),
        destinyHotel: useStorage('destinyHotel', {label: '', DetailsMbx: {}}),
        rooms: useStorage('rooms', 1),
        numberOfGuests: useStorage('numberOfGuests', 1)
    }),
    getters: {
        getIdLocation(state) {
            return `${state.destinyHotel.DetailsMbx.NsidId}-${state.destinyHotel.DetailsMbx.NsidNs}`
        },
        getRooms(state) {
            return {
                "adts": state.numberOfGuests,
                "childAge": [
                    0
                ]
            }
        },
        getEntryDate(state) {
            const splitDate = state.entryDate.split('/');
            return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        },
        getDepartureDate(state) {
            const splitDate = state.departureDate.split('/');
            return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        },
    },
    actions: {
        resetState() {
            this.entryDate = '';
            this.departureDate = '';
            this.destinyHotel = {label: '', DetailsMbx: {}};
            this.rooms = 1;
            this.numberOfGuests = 1;
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useSearchOptionsVooStore, import.meta.hot)
    );
}
