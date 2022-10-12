import { defineStore } from 'pinia';
import { axiosLocalAPI } from '@/plugins/axios';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      typePerson: null,
      fullName: null,
      cpf: null,
      birthday: null,
      cep: null,
      bairro: null,
      address: null,
      estado: null,
      number: 0,
      ciudade: null,
      complemento: null,
      mainPhone: null,
      alternativePhone: null,
      email: null,
      password: null,
    },
    currentStep: 0,
    user_logged: null,
    loading: false,
  }),
  getters: {},
  actions: {
    async login(payload) {
      this.loading = true;
      await axiosLocalAPI
        .post('/v1/login', payload)
        .then(({ data }) => {
          this.user_logged = data;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async register(payload) {
      await axiosLocalAPI
        .post('/v1/register', payload)
        .then(({ data }) => {
          this.user_logged = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
