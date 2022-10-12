import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import dataDuty from '@/utils/data-duty-moblix';

export const useMoblixStore = defineStore({
  id: 'moblix',
  state: () => ({
    totalItems: 0,
    loading: false,
    outboundFlights: [],
    returnFlights: [],
    aeroportos: [],
  }),
  getters: {
    getters: (state) => {},
  },
  actions: {
    async consultaAereo(payload) {
      this.loading = true;
      await axiosClientAPI
        .post('/v1/moblix/query', payload)
        .then((response) => {
          let { Aeroportos, Ida, Volta } = response.data.data[0];
          this.totalItems = response.data.totalItens;
          this.outboundFlights = dataDuty(Ida);
          this.returnFlights = dataDuty(Volta);
          this.aeroportos = Aeroportos;
          this.loading = false;
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
