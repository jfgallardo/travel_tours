/* import axios from "axios";

axios.defaults.baseUrl = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;



 */

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

/* 
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.user.token}`;
  return config;
}); */

export default axiosClient;
