import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/plugins/i18n";
import "@/assets/main.css";
import "@/plugins/vee-validate";
import Maska from "maska";
import "air-datepicker/air-datepicker.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Maska);

app.mount("#app");
