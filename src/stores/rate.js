import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';

export const useRateStore = defineStore('rate', {
  state: () => ({
    loading: false,
    bandeiras: {
      2: 'Visa',
      7: 'Mastercard',
      8: 'JBC',
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
