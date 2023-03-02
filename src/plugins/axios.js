import axios from 'axios';
import Toastify from 'toastify-js';
import { useAlertStore } from '@/stores/alert';
import { data } from 'autoprefixer';
export const axiosClientAPI = axios.create({
  baseURL: 'https://api.mrtravelandtours.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

export const axiosLocalAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
/* 
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.user.token}`;
  return config;
}); */

axiosClientAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  ({ response }) => {
    const alertStore = useAlertStore();
    alertStore.showMsg({
      message: response.data?.message ? `${response.data.message}` : '',
      backgrColor: 'bg-red-100',
      textColor: 'text-red-700',
    });
  }
);

axiosLocalAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  ({ response }) => {
    Toastify({
      text: `${response.data.message}`,
      duration: 4000,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #e40c10, #cd0b0e)',
      },
      offset: {
        x: '2em',
        y: '3em',
      },
    }).showToast();
    return Promise.reject(response.data);
  }
);
