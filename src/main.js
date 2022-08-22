import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/plugins/i18n";
import "@/assets/main.css";
import "@/plugins/vee-validate";
import axios from "@/plugins/axios";
import Maska from 'maska'

const app = createApp(App);

app.provide("$axios", axios);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Maska)

app.mount("#app");
