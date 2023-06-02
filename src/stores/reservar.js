import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const useReserveStore = defineStore('reserve', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {},
  actions: {
    async bookFlight(payload) {
      try {
        return await axiosClientAPI.post('api/v1/wooba/reservar', payload);
      } catch (e) {
        return e;
      }
    },

    async record(payload) {
      try {
        return await axiosClientAPI.post('api/v1/moblix/gravar', payload)
      } catch (e) {
        return e;
      }
    }
  },
});
