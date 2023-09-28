import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const usePayTransferStore = defineStore({
  id: 'payTransfer',
  state: () => ({}),
  getters: {},
  actions: {
    async sendEmail(payload) {
      try {
        return await axiosClientAPI.post('api/v1/email/transfer', payload);
      } catch (e) {
        return e;
      }
    },
  },
});
