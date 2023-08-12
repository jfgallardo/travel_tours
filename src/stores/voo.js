import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import { useAlertStore } from '@/stores/alert';
import { transform } from '@/utils/clean-data';

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
    totalItems: 0,
    meta: [],
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
    classesIda: (state) => {
      return [
        ...new Set(
          state.Ida?.flatMap((item) =>
            item.Voos.flatMap((o) => o.seatClass.description)
          )
        ),
      ];
    },
    classesVolta: (state) => {
      return [
        ...new Set(
          state.Volta?.flatMap((item) =>
            item.Voos.flatMap((o) => o.seatClass.description)
          )
        ),
      ];
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
            this.Ida = transform(
              data.flights,
              'ida',
              payload.Origem,
              payload.Destino
            );
            this.IdaVolta = data.IdaVolta;
            this.Volta = transform(
              data.flights,
              'vuelta',
              payload.Origem,
              payload.Destino
            );
            this.meta = data.meta;
          } else {
            this.$reset();
          }
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
    $reset() {
      this.loading = false;
      this.Companhia = '';
      this.CompanhiaVolta = '';
      this.Ida = [];
      this.IdaVolta = [];
      this.Volta = [];
      this.IsStarAlliance = false;
      this.Multas = null;
      this.MultiplesTrechos = [];
      this.Pagante = false;
      this.Platform = 0;
      this.QntdAdulto = 1;
      this.QntdBebe = 0;
      this.QntdCrianca = 0;
      this.TokenConsulta = '';
      this.Request = null;
      this.totalItems = 0;
      this.meta = [];
    },
  },
});
