import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    vooSelected: useStorage('vooSelected', {}),
  }),
  getters: {
    outboundFlightOrigin(state) {
      if (
        Object.keys(state.vooSelected).length > 0 &&
        state.vooSelected.VoosIda
      ) {
        return state.vooSelected.VoosIda[0];
      } else if (
        Object.keys(state.vooSelected).length > 0 &&
        state.vooSelected.Voos
      ) {
        return state.vooSelected.Voos[0];
      }
      return {};
    },
    outboundFlightDestination(state) {
      if (
        Object.keys(state.vooSelected).length > 0 &&
        state.vooSelected.VoosIda
      ) {
        const cant_voos = state.vooSelected.VoosIda.length;
        return state.vooSelected.VoosIda[cant_voos - 1];
      } else if (
        Object.keys(state.vooSelected).length > 0 &&
        state.vooSelected.Voos
      ) {
        const cant_voos = state.vooSelected.Voos.length;
        return state.vooSelected.Voos[cant_voos - 1];
      }
      return {};
    },
    returnFlightOrigin(state) {
      if (state.vooSelected.VoosVolta) {
        return Object.keys(state.vooSelected).length > 0
          ? state.vooSelected.VoosVolta[0]
          : {};
      }
      return {};
    },
    returnFlightDestination(state) {
      if (state.vooSelected.VoosVolta) {
        const cant_voos =
          Object.keys(state.vooSelected).length > 0
            ? state.vooSelected.VoosVolta.length
            : 0;
        return Object.keys(state.vooSelected).length > 0
          ? state.vooSelected.VoosVolta[cant_voos - 1]
          : {};
      }
      return {};
    },
  },
  actions: {
    resetState() {
      this.vooSelected = {};
    },
  },
});
