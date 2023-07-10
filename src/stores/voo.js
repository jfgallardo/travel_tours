import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import { useAlertStore } from '@/stores/alert';
import { transform } from "@/utils/clean-data";

export const useVooStore = defineStore({
  id: 'voo',
  state: () => ({
    loading: false,
    Companhia: '',
    CompanhiaVolta: '',
    Ida: [],
    IdaVolta: [],
    Volta: [],
    IsStarAlliance: false,
    Multas: null,
    MultiplesTrechos: [],
    Pagante: false,
    Platform: 0,
    QntdAdulto: 1,
    QntdBebe: 0,
    QntdCrianca: 0,
    TokenConsulta: '',
    Request: null,
    Aeroportos: [],

    totalItems: 0,
    meta: []
  }),
  getters: {
    priceRange: (state) => {
      const arrayPrice = [
        ...(state.Ida || []).map((o) => o.Preco),
        ...(state.Volta || []).map((o) => o.Preco),
        ...(state.IdaVolta || []).map((o) => o.Preco),
      ];

      const minPrice = arrayPrice.length > 0 ? Math.min(...arrayPrice) : 0;
      const maxPrice = arrayPrice.length > 0 ? Math.max(...arrayPrice) : 0;

      return { minPrice, maxPrice };
    },
  },
  actions: {
    async checkFlightsRoundTrip(payload) {
      const alertStore = useAlertStore();
      this.loading = true;
      return await axiosClientAPI
        .post('api/v1/voo/round-trip', payload)
        .then(({ data }) => {
          if (data.flights.length) {
            this.totalItems = data.totalItems;
            this.Platform = data.Platform;
            this.Companhia = data.Companhia;
            this.CompanhiaVolta = data.CompanhiaVolta;
            this.Ida = transform(data.flights, 'ida', payload.Origem, payload.Destino);
            this.IdaVolta = data.IdaVolta;
            this.Volta = transform(data.flights, 'vuelta',  payload.Origem, payload.Destino);
            this.meta = data.meta
          }

         /* this.IsStarAlliance = data.IsStarAlliance;
          this.Multas = data.Multas;
          this.MultiplesTrechos = data.MultiplesTrechos;
          this.Pagante = data.Pagante;

          this.QntdAdulto = data.QntdAdulto;
          this.QntdBebe = data.QntdBebe;
          this.QntdCrianca = data.QntdCrianca;
          this.TokenConsulta = data.TokenConsulta;
          this.Request = data.Request;
          this.Aeroportos = data.Aeroportos;*/
        })
        .catch((e) => {
          const errorCode =
            e?.response?.data?.message || e?.response?.data?.error_message;
          alertStore.showMsg({
            message: errorCode,
            backgrColor: 'red',
            textColor: 'red',
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
