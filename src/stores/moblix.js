import { defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import unifyDataMoblix from '@/utils/unifyDataMoblix';
import { useSearchOptionsHotelStore } from '@/stores/searchOptionsHotel';

const searchOptionsHotel = useSearchOptionsHotelStore();
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
    QntdAdulto: 0,
    dataHotels: [],
  }),
  getters: {},
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
    async consultarHotel() {
      this.loading = true;
      const body = {
        IdLocation: searchOptionsHotel.getIdLocation,
        Checkin: searchOptionsHotel.getEntryDate,
        Checkout: searchOptionsHotel.getDepartureDate,
        Rooms: searchOptionsHotel.getRooms,
        IdProvider: 2,
        NationalityLeaderPax: 'true',
      };
      await axiosClientAPI
        .post('api/v1/moblix/hotel-available', body)
        .then(({ data }) => {
          this.dataHotels = data.Data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
