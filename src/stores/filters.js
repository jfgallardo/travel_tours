import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    stops: '',
    hoursTravel: 0,
    travelClass: '',
    priceRange: 0,
    airports: '',
    flightCompanies: '',
    baggage: '',
    arrivalSchedule: '',
    departureTime: '',
  }),
  getters: {},
  actions: {},
});
