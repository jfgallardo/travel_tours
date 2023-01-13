import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    vooSelected: useStorage('vooSelected', {}),
  }),
  getters: {
    outboundFlightOrigin(state) {
      return state.vooSelected.VoosIda[0];
    },
    outboundFlightDestination(state) {
      const cant_voos = state.vooSelected.VoosIda.length;
      return state.vooSelected.VoosIda[cant_voos - 1];
    },
    returnFlightOrigin(state) {
      return state.vooSelected.VoosVolta[0];
    },
    returnFlightDestination(state) {
      const cant_voos = state.vooSelected.VoosVolta.length;
      return state.vooSelected.VoosVolta[cant_voos - 1];
    },
  },
  actions: {},
});