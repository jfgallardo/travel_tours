import { defineStore, acceptHMRUpdate } from 'pinia';
import { axiosClientAPI, axiosLocalAPI } from '@/plugins/axios';
import Toastify from 'toastify-js';
import { useStorage } from '@vueuse/core';


export const useAuthStore = defineStore({
    id: 'auth',
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
      termos: false,
      currentStep: 0,
      currentStepPayment: 0,
      user_logged: useStorage('user_logged', {}),
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
          })
          .finally(() => {
            this.loading = false;
  
          });
      },
      async register() {
        this.loading = true;
        const splitDate = this.user.birthday.split('/');
        this.user.birthday = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        await axiosLocalAPI
          .post('/v1/register', this.user)
          .then(() => {
            Toastify({
              text: "Usuario registrado, por favor inicie session",
              duration: 3000,
              gravity: 'bottom',
              position: 'center',
              stopOnFocus: true,
            }).showToast();
          })
          .finally(() => {
            this.loading = false;
          });
      },
      logout() {
        this.user_logged = {}
      }
    },
  });
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
  }
  