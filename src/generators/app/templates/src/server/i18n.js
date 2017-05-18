import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ['cookie'],
      caches: false
    },
    backend: {
      loadPath: '../shared/i18n/locales/{{lng}}/{{ns}}.json',
    },
    lng: 'en',
    fallbackLng: 'en',
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });


export default i18n;