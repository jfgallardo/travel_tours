import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    vooSelected: useStorage('vooSelected', {}),
  }),
  getters: {
    outboundFlightOrigin(state) {
      return Object.keys(state.vooSelected).length > 0
        ? state.vooSelected.VoosIda[0]
        : {};
    },
    outboundFlightDestination(state) {
      const cant_voos =
        Object.keys(state.vooSelected).length > 0
          ? state.vooSelected.VoosIda.length
          : 0;
      return Object.keys(state.vooSelected).length > 0
        ? state.vooSelected.VoosIda[cant_voos - 1]
        : {};
    },
    returnFlightOrigin(state) {
      return Object.keys(state.vooSelected).length > 0
        ? state.vooSelected.VoosVolta[0]
        : {};
    },
    returnFlightDestination(state) {
      const cant_voos =
        Object.keys(state.vooSelected).length > 0
          ? state.vooSelected.VoosVolta.length
          : 0;
      return Object.keys(state.vooSelected).length > 0
        ? state.vooSelected.VoosVolta[cant_voos - 1]
        : {};
    },
  },
  actions: {
    resetState() {
      this.vooSelected = {};
    },
  },
});
