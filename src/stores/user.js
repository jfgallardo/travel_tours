import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import moment from 'moment/min/moment-with-locales';
import i18n from '@/plugins/i18n';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    vooSelected: useStorage('vooSelected', {}),
  }),
  getters: {},
  actions: {
    resetState() {
      this.vooSelected = {};
    },
  },
});
