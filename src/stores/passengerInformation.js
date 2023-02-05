import { defineStore } from 'pinia';

export const usePassengerStore = defineStore('passenger', {
  state: () => ({
    informationAdults: [],
    informationTeenagers: [],
    informationBabies: [],
  }),
  getters: {},
  actions: {},
});
