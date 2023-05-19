import { defineStore, acceptHMRUpdate } from 'pinia';
import axiosClientAPI from '@/plugins/axios';
import Cookies from 'js-cookie';
import { flightTransformation } from '@/utils/data-transformation';

export const useRedisStore = defineStore({
  id: 'redis',
  state: () => ({
    loadingSearch: false,
  }),
  getters: {},
  actions: {
    async findVooOneSelected(id) {
      this.loadingSearch = true;
      await axiosClientAPI
        .get(`api/v1/find-travel/${id}`)
        .then(({ data }) => {
          const voo_one = flightTransformation(data, data.Platform);
          Cookies.set('I', JSON.stringify(voo_one));
        })
        .finally(() => {
          this.loadingSearch = false;
        });
    },
    async findVooTwoSelected(id) {
      this.loadingSearch = true;
      await axiosClientAPI
        .get(`api/v1/find-travel/${id}`)
        .then(({ data }) => {
          const voo_two = flightTransformation(data, data.Platform);
          Cookies.set('V', JSON.stringify(voo_two));
        })
        .finally(() => {
          this.loadingSearch = false;
        });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRedisStore, import.meta.hot));
}
