import { defineStore } from 'pinia';
import { arrayAinB } from '@/utils/filterItems';
import { useVooStore } from '@/stores/voo';

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
      const vooStore = useVooStore();

      if (vooStore.Ida.length > 0 || vooStore.Volta.length > 0) {
        let filterIda = vooStore.Ida;
        let filterVolta = vooStore.Volta;

        filterIda = filterIda.filter(item => item.ValorAdulto > 0)
        filterVolta = filterVolta.filter(item => item.ValorAdulto > 0)

        if (state.baggage.value === 1) {
          filterIda = filterIda.filter(
            (fly) =>
              fly.Baggage?.filter(
                (o) => !o.TextoBagagem.includes('mão') && o.Quantidade > 0
              ).length
          );
          filterVolta = filterVolta.filter(
            (fly) =>
              fly.Baggage?.filter(
                (o) => !o.TextoBagagem.includes('mão') && o.Quantidade > 0
              ).length
          );
        } else if (state.baggage.value === 0) {
          filterIda = filterIda.filter(
            (fly) =>
              !fly.Baggage?.filter(
                (o) => !o.TextoBagagem.includes('mão') && o.Quantidade > 0
              ).length
          );
          filterVolta = filterVolta.filter(
            (fly) =>
              !fly.Baggage?.filter(
                (o) => !o.TextoBagagem.includes('mão') && o.Quantidade > 0
              ).length
          );
        }

        if (state.stops.value === 0) {
          filterIda = vooStore.Ida.filter((fly) => fly.NumeroParadas === 0);
          filterVolta = vooStore.Volta.filter((fly) => fly.NumeroParadas === 0);
        } else if (state.stops.value === 1) {
          filterIda = vooStore.Ida.filter((fly) => fly.NumeroParadas === 1);
          filterVolta = vooStore.Volta.filter((fly) => fly.NumeroParadas === 1);
        } else if (state.stops.value === 2) {
          filterIda = vooStore.Ida.filter((fly) => fly.NumeroParadas >= 2);
          filterVolta = vooStore.Volta.filter((fly) => fly.NumeroParadas >= 2);
        }

        //FALTA COMPANIAS

        filterIda = filterIda.filter((item) =>
          arrayAinB(state.airports, item.AirportsIata)
        );
        filterVolta = filterVolta.filter((item) =>
          arrayAinB(state.airports, item.AirportsIata)
        );

        filterIda = filterIda.filter(
          (item) => +item.Preco >= +state.priceRange
        );
        filterVolta = filterVolta.filter(
          (item) => +item.Preco >= +state.priceRange
        );

        return {
          Ida: filterIda,
          Volta: filterVolta,
        };
      }
      /*let flyFilters = woobaStore.outboundFlights;
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
        return flyFilters;*/
      return {};
    },
  },
  actions: {},
});
