/* import axios from "axios";

axios.defaults.baseUrl = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;
https://polar-hollows-55151.herokuapp.com/api


 */

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://polar-hollows-55151.herokuapp.com/api",
});

/* 
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.user.token}`;
  return config;
}); */

export default axiosClient;
