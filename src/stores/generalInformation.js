import { defineStore } from 'pinia';

export const useGeneralInformation = defineStore('generalInformation', {
  state: () => ({
    info: {},
    card: {
      cardNumber: '',
      cardType: '',
      cardExpiration: '',
      cardSecurityCode: '',
      cardName: '',
      cpfUserCard: '',
      isValidCpf: false,
      isValidFront: false,
      bainderaSelected: '',
      planDeFinanciamento: null,
    },
    detailsUser: {
      birthday: '',
      nameBuy: '',
      codeArea: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      state: '',
      city: '',
      sexo: '',
      idd: '',
      parcelas: '',
    },
    paymentMethod: 4,
    acceptConditions: false,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
  persist: true,
});
