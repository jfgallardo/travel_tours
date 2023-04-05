import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import { useAuthStore } from '@/stores/auth';

export const usePassengerUserStore = defineStore({
  id: 'passenger',
  state: () => ({
    passengers: [],
  }),
  getters: {
    getPassengerById: (state) => {
      return (userId) => state.passengers.find((user) => user.id === userId);
    },
  },
  actions: {
    async fetchPassengers() {
      const authStore = useAuthStore();
      return await axiosClientAPI.get(
        `/api/v1/passengers/list-by-user?user=${authStore.userLogged?.id}`
      );
    },
    async addPassenger(payload) {
      return await axiosClientAPI.post('/api/v1/passengers', payload);
    },
    async deletePassenger(payload) {
      return await axiosClientAPI.post(`/api/v1/passengers/delete/${payload}`);
    },
  },
});
