import { vue3Debounce } from "vue-debounce";
import App from "@/App.vue";
import "@/assets/main.css";
import i18n from "@/plugins/i18n";
import "@/plugins/vee-validate";
import router from "@/router";
import "air-datepicker/air-datepicker.css";
import "toastify-js/src/toastify.css";
import Maska from "maska";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);
app.directive("debounce", vue3Debounce({ lock: true }));
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Maska);

app.mount("#app");
