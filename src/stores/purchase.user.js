import { defineStore } from 'pinia';

export const usePurchaseStore = defineStore('purchase', {
  state: () => ({
    informationAdults: [],
    informationTeenagers: [],
    informationBabies: [],
  }),
  getters: {},
  actions: {},
  persist: true,
});
