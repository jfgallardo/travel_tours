import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useSearchOptionsVooStore = defineStore('searchOptionsVoo', {
  state: () => ({
    dateOfDeparture: useStorage('dateOfDeparture', ''),
    dateOfReturn: useStorage('dateOfReturn', ''),
    origin: useStorage('origin', { label: '', iata: '' }),
    destiny: useStorage('destiny', { label: '', iata: '' }),
    cabin: useStorage('cabin', { label: 'Todas', value: -1 }),
    adults: useStorage('adults', 1),
    teenagers: useStorage('teenagers', 0),
    babies: useStorage('babies', 0),
  }),
  getters: {},
  actions: {
    resetState() {
      this.dateOfDeparture = null;
      this.dateOfReturn = null;
      this.origin = { label: '', iata: '' };
      this.destiny = { label: '', iata: '' };
      this.cabin = { label: 'Todas', value: -1 };
      this.adults = 1;
      this.teenagers = 0;
      this.babies = 0;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useSearchOptionsVooStore, import.meta.hot)
  );
}
