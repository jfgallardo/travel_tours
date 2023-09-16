import { vue3Debounce } from 'vue-debounce';
import App from '@/App.vue';
import '@/assets/main.css';
import i18n from '@/plugins/i18n';
import '@/plugins/vee-validate';
import router from '@/router';
import 'toastify-js/src/toastify.css';
import { vMaska } from 'maska';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import {
  cpfDirective,
  cepDirective,
  phoneDirective,
  numberCardDirective,
  cvcDirective,
  expirationCardDirective,
  onlyPhoneDirective
} from '@/directives/input-mask';
import { setupCalendar } from 'v-calendar';

const app = createApp(App);
const pinia = createPinia();

app.directive('debounce', vue3Debounce({ lock: true }));
app.directive('maska', vMaska);
app.directive('cpf-mask', cpfDirective);
app.directive('cep-mask', cepDirective);
app.directive('phone-mask', phoneDirective);
app.directive('onlyphone-mask', onlyPhoneDirective);
app.directive('nc-mask', numberCardDirective);
app.directive('cvc-mask', cvcDirective);
app.directive('expiration-mask', expirationCardDirective);

app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(i18n);
app.use(VueCookies);
app.use(setupCalendar, {});

app.mount('#app');
