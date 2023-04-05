import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import {
  woobaData,
  woobaDataMultiple,
  woobaPrice,
  woobaTravelTime,
} from '@/utils/unifyDataWooba';

export const useWoobaStore = defineStore({
  id: 'wooba',
  state: () => ({
    loading: false,
    outboundFlights: [],
    returnFlights: [],
    qntdBebe: 0,
    qntdCrianca: 0,
    qntdAdulto: 0,
    recomendacoes: [],
    exception: '',
    airportsFilter: [],
    companies: [],
  }),
  getters: {
    travelTime: (state) =>
      woobaTravelTime(state.outboundFlights, state.returnFlights),
    priceGeral: (state) =>
      woobaPrice(state.outboundFlights, state.returnFlights),
    offers: (state) => state.outboundFlights[0]?.OfertasDesde || [],
  },
  actions: {
    async consultaOrigemDestino(payload) {
      try {
        return await axiosClientAPI.post('api/v1/wooba/query', payload);
      } catch (e) {
        return e;
      }
    },
    async consultaMultiploTrecho(payload) {
      try {
        return await axiosClientAPI.post(
          'api/v1/wooba/multiplos-trechos',
          payload
        );
      } catch (e) {
        return e;
      }
    },
  },
});
