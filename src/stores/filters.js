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
      let flyFilters = [];
      if (woobaStore.outboundFlights.length > 0) {
        switch (state.baggage.value) {
          case 0:
            flyFilters = woobaStore.outboundFlights.filter(
              (fly) =>
                !fly.VoosIda[0].BagagemInclusa &&
                !fly.VoosVolta[0].BagagemInclusa
            );
            break;
          case 1:
            flyFilters = woobaStore.outboundFlights.filter(
              (fly) =>
                fly.VoosIda[0].BagagemInclusa || fly.VoosVolta[0].BagagemInclusa
            );
            break;
          default:
            flyFilters = woobaStore.outboundFlights;
        }

        flyFilters = flyFilters.filter((fly) =>
          state.flightCompanies.includes(fly.CiaMandatoria.CodigoIata)
        );

        flyFilters = flyFilters.filter((fly) =>
          arrayAinB(state.airports, fly.AirportsIata)
        );
      }
      return flyFilters;
    },
  },
  actions: {},
});
