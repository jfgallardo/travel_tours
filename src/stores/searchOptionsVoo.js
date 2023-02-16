import { defineStore } from 'pinia';

export const useSearchOptionsVooStore = defineStore('searchOptionsVoo', {
  state: () => ({
    dateOfDeparture: '',
    dateOfReturn: '',
    origin: { label: '', iata: '' },
    destiny: { label: '', iata: '' },
    cabin: { label: 'Todas', value: null },
    adults: 1,
    teenagers: 0,
    babies: 0,
    onlyBaggage: false,
    quantidadeDeVoos: 10,
    apenasVoosDiretos: false,
  }),
  getters: {
    getDateIdaFormatter: (state) => {
      if (state?.dateOfDeparture) {
        const splitDate = state.dateOfDeparture.split('/');
        return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
      }
      return '';
    },
    getDateVoltaFormatter: (state) => {
      if (state?.dateOfReturn) {
        const splitDate = state.dateOfReturn.split('/');
        return `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`;
      }
      return '';
    },
  },
  actions: {},
});
