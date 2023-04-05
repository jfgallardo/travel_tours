import { defineStore } from 'pinia';
import axiosClientAPI from '@/plugins/axios';

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
      number: '',
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
      bainderaSelected: '',
      planDeFinanciamento: null,
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
    emailLocal: '',
    passwordLocal: '',
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
    async register(payload) {
      try {
        return await axiosClientAPI.post('/api/v1/register', payload);
      } catch (e) {
        return e;
      }
    },
  },
});
