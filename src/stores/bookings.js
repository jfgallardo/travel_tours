import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

export const useBookingsStore = defineStore({
  id: 'bookings',
  state: () => ({}),
  getters: {},
  actions: {
    async allBookings() {
      try {
        return await axiosClientAPI.get('api/v1/booking');
      } catch (e) {
        return e;
      }
    },
  },
});
