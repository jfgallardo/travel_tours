import { defineStore } from 'pinia';
import { useWoobaStore } from '@/stores/wooba';
import { arrayAinB } from '@/utils/filterItems';

const woobaStore = useWoobaStore();

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    stops: '',
    hoursTravel: 0,
    travelClass: '',
    priceRange: 0,
    airports: [],
    flightCompanies: [],
    baggage: '',
    arrivalSchedule: '',
    departureTime: '',
  }),
  getters: {
    flyFilters: (state) => {
      if (woobaStore.returnFlights && woobaStore.returnFlights.length > 0) {
        return woobaStore.returnFlights;
      } else {
        let flyFilters = woobaStore.outboundFlights;
        if (woobaStore.outboundFlights.length > 0) {
          if (state.baggage.value === 1) {
            flyFilters = flyFilters.filter((fly) => fly.Baggage);
          } else if (state.baggage.value === 0) {
            flyFilters = flyFilters.filter((fly) => !fly.Baggage);
          }

          if (state.stops.value === 0) {
            flyFilters = woobaStore.outboundFlights.filter(
              (fly) => fly.NumeroParadas - 1 === 0
            );
          } else if (state.stops.value === 1) {
            flyFilters = woobaStore.outboundFlights.filter(
              (fly) => fly.NumeroParadas - 1 === 1
            );
          } else if (state.stops.value === 2) {
            flyFilters = woobaStore.outboundFlights.filter(
              (fly) => fly.NumeroParadas - 1 >= 2
            );
          }

          flyFilters = flyFilters.filter((fly) =>
            state.flightCompanies.includes(fly.CiaMandatoria.CodigoIata)
          );

          flyFilters = flyFilters.filter((fly) =>
            arrayAinB(state.airports, fly.AirportsIata)
          );

          flyFilters = flyFilters.filter(
            (fly) => +fly.Preco.TotalGeral >= +state.priceRange
          );

          flyFilters = flyFilters.filter(
            (fly) => +fly.TempoTotal.split(':')[0] >= +state.hoursTravel
          );

          if (state.travelClass.name) {
            flyFilters = flyFilters.filter((fly) =>
              fly.Cabine.includes(state.travelClass.name)
            );
          }
        }
        return flyFilters;
      }
    },
  },
  actions: {},
});
