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
      return await axiosClientAPI.post('/api/v1/login', payload);
    },
    async register(payload) {
      return await axiosClientAPI.post('/api/v1/register', payload);
    },
    async verifyEmail(payload) {
      return await axiosClientAPI.post('/api/v1/verify-email', payload);
    },
    async forgotPassword(payload) {
      return await axiosClientAPI.post('/api/v1/forgot-password', payload);
    },
  },
  persist: true,
});
