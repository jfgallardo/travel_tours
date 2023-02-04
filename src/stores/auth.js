import { acceptHMRUpdate, defineStore } from 'pinia';
import { axiosClientAPI } from '@/plugins/axios';
import Toastify from 'toastify-js';

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
    card: {
      cardNumber: '',
      cardType: '',
      cardExpiration: '',
      cardSecurityCode: '',
      cardName: '',
      cpfUserCard: '',
      isValidFront: false,
    },
    dataBuy: {
      birthday: '',
      nameBuy: '',
      codeArea: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      state: '',
      city: '',
    },
    paymentMethod: 'Credit Card',
    termos: false,
    currentStep: 0,
    currentStepPayment: 0,
    userLogged: null,
    loading: false,
  }),
  getters: {},
  actions: {
    async login(payload) {
      try {
        return await axiosClientAPI.post('/api/v1/login', payload);
      } catch (e) {
        return e;
      }
    },
    async register() {
      this.loading = true;
      const splitDate = this.user.birthday.split('/');
      this.user.birthday = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
      await axiosClientAPI
        .post('/api/v1/register', this.user)
        .then(() => {
          Toastify({
            text: 'Usuario registrado, por favor inicie session',
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
