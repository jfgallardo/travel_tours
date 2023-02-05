import { defineStore, acceptHMRUpdate } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import { woobaDataRedis } from '@/utils/unifyDataWooba';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
export const useRedisStore = defineStore({
  id: 'redis',
  state: () => ({
    loadingSearch: false,
  }),
  getters: {},
  actions: {
    async findVooSelected(id) {
      this.loadingSearch = true;
      await axiosClientAPI
        .get(`api/v1/find-travel/${id}`)
        .then(({ data }) => {
          userStore.vooSelected = woobaDataRedis(data);
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
