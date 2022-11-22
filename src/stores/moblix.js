import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import unifyDataMoblix from '@/utils/unifyDataMoblix';

export const useMoblixStore = defineStore({
  id: 'moblix',
  state: () => ({
    totalItems: 0,
    loading: false,
    outboundFlights: [],
    returnFlights: [],
    aeroportos: [],
    qntdBebe: 0,
    qntdCrianca: 0,
    qntdAdulto: 0,
  }),
  actions: {
    async consultaAereo(payload) {
      this.loading = true;
      await axiosClientAPI
        .post('api/v1/moblix/query', payload)
        .then((response) => {
          let { Aeroportos, Ida, Volta, QntdAdulto, QntdCrianca, QntdBebe } =
            response.data.data;
          this.totalItems = response.data.totalItens;
          this.outboundFlights = unifyDataMoblix(Ida);
          this.returnFlights = unifyDataMoblix(Volta);
          this.aeroportos = Aeroportos;
          this.loading = false;
          this.qntdBebe = QntdBebe;
          this.qntdCrianca = QntdCrianca;
          this.qntdAdulto = QntdAdulto;
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    async clear() {
      this.totalItems = 0;
      this.outboundFlights = [];
      this.returnFlights = [];
      this.aeroportos = [];
      this.loading = false;
    },
  },
});
