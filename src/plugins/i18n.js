import { createI18n } from 'vue-i18n';

import br from '@/assets/locales/br-BR.json';
import es from '@/assets/locales/es-ES.json';
import en from '@/assets/locales/en-US.json';

const i18n = createI18n({
  locale: 'br',
  fallbackLocale: 'br',
  silentFallbackWarn: true,
  messages: {
    br,
    es,
    en,
  },
});

export default i18n;
