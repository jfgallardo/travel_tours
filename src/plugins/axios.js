/* import axios from "axios";

axios.defaults.baseUrl = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export default axios;
https://polar-hollows-55151.herokuapp.com/api
shy-snowflake-5917.fly.dev
https://king-prawn-app-ecgju.ondigitalocean.app/

 */

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://king-prawn-app-ecgju.ondigitalocean.app/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
});

/* 
axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.user.token}`;
  return config;
}); */

export default axiosClient;
