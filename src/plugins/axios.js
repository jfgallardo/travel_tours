import axios from 'axios';
import Cookies from 'js-cookie';

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
  const token = Cookies.get('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClientAPI;
