import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const axiosClientAPI = axios.create({
  baseURL: 'https://api.mrtravelandtours.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});
axiosClientAPI.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  config.headers.Authorization = `Bearer ${authStore.userLogged?.access_token}`;
  return config;
});

export default axiosClientAPI;
