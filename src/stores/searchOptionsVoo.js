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
    multiplosTrechos: [
      {
        departureDate: '',
        destino: {
          string: '',
          iata: '',
        },
        origem: {
          string: '',
          iata: '',
        },
      },
      {
        departureDate: '',
        destino: {
          string: '',
          iata: '',
        },
        origem: {
          string: '',
          iata: '',
        },
      },
    ],
  }),
  getters: {
    getDateIdaFormatter: (state) => {
      if (state?.dateOfDeparture) {
        return state.dateOfDeparture.split('T')[0];
      }
      return '';
    },
    getDateVoltaFormatter: (state) => {
      if (state?.dateOfReturn) {
        return state.dateOfReturn.split('T')[0];
      }
      return '';
    },
  },
  actions: {},
  persist: true,
});
