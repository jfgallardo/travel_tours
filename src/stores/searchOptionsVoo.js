import {acceptHMRUpdate, defineStore} from 'pinia';
import {useStorage} from '@vueuse/core';

export const useSearchOptionsVooStore = defineStore('searchOptionsVoo', {
    state: () => ({
        dateOfDeparture: useStorage('dateOfDeparture', ''),
        dateOfReturn: useStorage('dateOfReturn', ''),
        origin: useStorage('origin', {label: '', iata: ''}),
        destiny: useStorage('destiny', {label: '', iata: ''}),
        cabin: useStorage('cabin', {label: 'Todas', value: -1}),
        adults: useStorage('adults', 1),
        teenagers: useStorage('teenagers', 0),
        babies: useStorage('babies', 0),
        onlyBaggage: useStorage('onlyBaggage', false),
        quantidadeDeVoos: useStorage('quantidadeDeVoos', 10),
        apenasVoosDiretos: useStorage('apenasVoosDiretos', false),
    }),
    getters: {
        getDateIdaFormatter: (state) => {
            const splitDate = state.dateOfDeparture.split('/');
            return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
        },
        getDateVoltaFormatter: (state) => {
            const splitDate = state.dateOfReturn.split('/');
            return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
        },
    },
    actions: {
        resetState() {
            this.dateOfDeparture = null;
            this.dateOfReturn = null;
            this.origin = {label: '', iata: ''};
            this.destiny = {label: '', iata: ''};
            this.cabin = {label: 'Todas', value: -1};
            this.adults = 1;
            this.teenagers = 0;
            this.babies = 0;
            this.onlyBaggage = false;
            this.quantidadeDeVoos = 10;
            this.apenasVoosDiretos = false;
        },
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useSearchOptionsVooStore, import.meta.hot)
    );
}
