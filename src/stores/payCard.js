import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const usePayCardStore = defineStore({
  id: 'payCard',
  state: () => ({}),
  getters: {},
  actions: {
    async paymentCard(payload) {
      try {
        return await axiosClientAPI.post('api/v1/payment/pagarme/transaction', payload);
      } catch (e) {
        return e;
      }
    },
  },
});
