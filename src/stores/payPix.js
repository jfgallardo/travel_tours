import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const usePayPixStore = defineStore({
  id: 'payPix',
  state: () => ({}),
  getters: {},
  actions: {
    async paymentPix(payload) {
      try {
        return await axiosClientAPI.post('api/v1/payment/assas/pix', payload);
      } catch (e) {
        return e;
      }
    },
  },
});
