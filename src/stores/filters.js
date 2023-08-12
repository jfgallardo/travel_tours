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

    arrival_partida: '',
    departure_partida: '',

    arrival_llegada: '',
    departure_llegada: '',
  }),
  getters: {
    flyFilters: (state) => {
      const vooStore = useVooStore();

      if (vooStore.Ida.length || vooStore.Volta.length) {
        let filterIda = vooStore.Ida;
        let filterVolta = vooStore.Volta;

        // filterIda = filterIda.filter((item) => item.ValorAdulto > 0);
        //filterVolta = filterVolta.filter((item) => item.ValorAdulto > 0);

        //TODO FILTRO DE EQUIPAJE
        if (state.baggage.value === 1) {
          filterIda = filterIda.filter((fly) => fly.Baggage !== null);
          filterVolta = filterVolta.filter((fly) => fly.Baggage !== null);
        } else if (state.baggage.value === 0) {
          filterIda = filterIda.filter((fly) => fly.Baggage === null);
          filterVolta = filterVolta.filter((fly) => fly.Baggage === null);
        }

        //TODO FILTRO DE PARADAS
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

        //TODO FILTRO DE AREOPUERTOS
        if (state.airports.length) {
          filterIda = filterIda.filter((item) => {
            const iataList = item.ConfiguracoesRotas.split(/[_-]/).filter(
              (iata) => iata.length === 3
            );
            const uniqueIataList = [...new Set(iataList)];
            if (arrayAinB(state.airports, uniqueIataList)) return true;
          });

          filterVolta = filterVolta.filter((item) => {
            const iataList = item.ConfiguracoesRotas.split(/[_-]/).filter(
              (iata) => iata.length === 3
            );
            const uniqueIataList = [...new Set(iataList)];
            if (arrayAinB(state.airports, uniqueIataList)) return true;
          });
        }

        //TODO FILTRO DE COMPAÑIAS
        if (state.flightCompanies.length) {
          filterIda = filterIda.filter((item) => {
            const lowercaseCiaMandatoria = item.CiaMandatoria.toLowerCase();
            const lowercaseFlightCompanies = state.flightCompanies.map(
              (company) => company.toLowerCase()
            );

            return lowercaseFlightCompanies.includes(lowercaseCiaMandatoria);
          });

          filterVolta = filterVolta.filter((item) => {
            const lowercaseCiaMandatoria = item.CiaMandatoria.toLowerCase();
            const lowercaseFlightCompanies = state.flightCompanies.map(
              (company) => company.toLowerCase()
            );

            return lowercaseFlightCompanies.includes(lowercaseCiaMandatoria);
          });
        }

        //TODO FILTRO DE CLASSES

        if (state.travelClass) {
          filterIda = filterIda.filter((item) => {
            const classes = [
              ...new Set(item.Voos.flatMap((o) => o.seatClass.description)),
            ];

            return classes.includes(state.travelClass);
          });

          filterVolta = filterVolta.filter((item) => {
            const classes = [
              ...new Set(item.Voos.flatMap((o) => o.seatClass.description)),
            ];

            return classes.includes(state.travelClass);
          });
        }

        //TODO FILTRO DE HORARIOS

        if (state.arrival_partida) {
          filterIda = filterIda.filter((item) => {
            const arrayHours = item.Voos.flatMap((o) => o.arrivalDate);
            return arrayHours.includes(state.arrival_partida);
          });
        }

        if (state.departure_partida) {
          filterIda = filterIda.filter((item) => {
            const arrayHours = item.Voos.flatMap((o) => o.departureDate);
            return arrayHours.includes(state.departure_partida);
          });
        }

        if (state.arrival_llegada) {
          filterVolta = filterVolta.filter((item) => {
            const arrayHours = item.Voos.flatMap((o) => o.arrivalDate);
            return arrayHours.includes(state.arrival_llegada);
          });
        }

        if (state.departure_llegada) {
          filterVolta = filterVolta.filter((item) => {
            const arrayHours = item.Voos.flatMap((o) => o.departureDate);
            return arrayHours.includes(state.departure_llegada);
          });
        }

        /*

        filterIda = filterIda.filter(
          (item) => +item.Preco >= +state.priceRange
        );
        filterVolta = filterVolta.filter(
          (item) => +item.Preco >= +state.priceRange
        );*/

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
