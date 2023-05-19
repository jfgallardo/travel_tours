import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import { useAlertStore } from '@/stores/alert';
import { flightTransformation } from '@/utils/data-transformation';

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
    async checkFlightsRoundTrip(payload, filter) {
      const alertStore = useAlertStore();
      this.loading = true;
      return await axiosClientAPI
        .post('api/v1/voo/round-trip', payload, {
          params: { filter },
        })
        .then(({ data }) => {
          this.Companhia = data.Companhia;
          this.CompanhiaVolta = data.CompanhiaVolta;
          this.Ida = flightTransformation(data.Ida, data.Platform);
          this.IdaVolta = data.IdaVolta;
          this.Volta = flightTransformation(data.Volta, data.Platform);
          this.IsStarAlliance = data.IsStarAlliance;
          this.Multas = data.Multas;
          this.MultiplesTrechos = data.MultiplesTrechos;
          this.Pagante = data.Pagante;
          this.Platform = data.Platform;
          this.QntdAdulto = data.QntdAdulto;
          this.QntdBebe = data.QntdBebe;
          this.QntdCrianca = data.QntdCrianca;
          this.TokenConsulta = data.TokenConsulta;
          this.Request = data.Request;
          this.Aeroportos = data.Aeroportos.map((o) => o.Iata);
        })
        .catch((e) => {
          console.log(e);
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
