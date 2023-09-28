import { defineStore } from 'pinia';
import { arrayAinB } from '@/utils/filterItems';
import { useVooStore } from '@/stores/voo';

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    stops: '',
    hoursTravel: {
      minHour: 0,
      maxHour: 0
    },
    travelClass: '',
    priceRange: {
      minPrice: 0,
      maxPrice: 0,
    },
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

        //TODO FILTRO DE RANGO DE PRECIOS
        if (state.priceRange.minPrice) {
          filterIda = filterIda.filter(
            (item) => +item.Preco >= +state.priceRange.minPrice
          );
          filterVolta = filterVolta.filter(
            (item) => +item.Preco >= +state.priceRange.minPrice
          );
        }

        if (state.priceRange.maxPrice) {
          filterIda = filterIda.filter(
            (item) => +item.Preco <= +state.priceRange.maxPrice
          );
          filterVolta = filterVolta.filter(
            (item) => +item.Preco <= +state.priceRange.maxPrice
          );
        }

         //TODO FILTRO DE RANGO DE DURATION
         if (state.hoursTravel.minHour) {
          filterIda = filterIda.filter(
            (item) => +item.TempoTotal >= +state.hoursTravel.minHour
          );
          filterVolta = filterVolta.filter(
            (item) => +item.TempoTotal >= +state.hoursTravel.minHour
          );
        }

        if (state.hoursTravel.maxHour) {
          filterIda = filterIda.filter(
            (item) => +item.TempoTotal <= +state.hoursTravel.maxHour
          );
          filterVolta = filterVolta.filter(
            (item) => +item.TempoTotal <= +state.hoursTravel.maxHour
          );
        }

        return {
          Ida: filterIda,
          Volta: filterVolta,
        };
      }
      
      return {};
    },
  },
  actions: {},
});
