import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'br',
  fallbackLocale: 'br',
  silentFallbackWarn: true,
  messages,
  warnHtmlMessage: false,
});
export default i18n;
