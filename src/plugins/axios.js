import axios from 'axios';
import Toastify from 'toastify-js';

export const axiosClientAPI = axios.create({
  baseURL: 'https://api.mrtravelandtours.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const axiosLocalAPI = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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
  (error) => {
    Toastify({
      text: `Ops!! ${error.message}`,
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
    return Promise.reject(error);
  }
);
