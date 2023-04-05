import moment from 'moment/min/moment-with-locales';
import { useI18n } from 'vue-i18n';

export function useDateFormatter(value) {
  const { locale } = useI18n();
  if (locale.value === 'br') {
    moment.locale('pt-br');
  } else {
    moment.locale(locale.value);
  }
  return upperC(moment(value).format('dddd D MMM YYYY'));
}
const upperC = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
