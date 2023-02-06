import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';

export const useRateStore = defineStore('rate', {
  state: () => ({
    loading: false,
    bandeiras: {
      1: 'Visa',
      2: 'Amex',
      3: 'Mastercard',
      4: 'Credicard',
      5: 'Diners',
      6: 'Hipercard',
      7: 'Elo',
      8: 'Discover',
      9: 'Redeconv',
      10: 'UATP',
      11: 'ECXCard',
      12: 'Banese',
    },
  }),
  getters: {},
  actions: {
    async tarifar(payload) {
      try {
        return await axiosClientAPI.post('/api/v1/wooba/tarifar', payload);
      } catch (e) {
        return e;
      }
    },
  },
});