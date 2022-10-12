import { defineStore } from 'pinia';

export const useAlertStore = defineStore({
  id: 'alert',
  state: () => ({
    message: '',
    backgrColor: '',
    textColor: '',
  }),
  getters: {},
  actions: {
    async showMsg(payload) {
      this.message = payload.message;
      this.backgrColor = payload.backgrColor;
      this.textColor = payload.textColor;
    },
    async closeMsg() {
      this.message = '';
      this.backgrColor = '';
      this.textColor = '';
    },
  },
});
