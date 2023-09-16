import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const usePayBoletoStore = defineStore({
  id: 'payBoleto',
  state: () => ({}),
  getters: {},
  actions: {
    async paymentBoleto(payload) {
      try {
        return await axiosClientAPI.post('api/v1/payment/pagarme/transaction', payload);
      } catch (e) {
        return e;
      }
    },
  },
});
