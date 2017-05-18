import path from 'path';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(Cache)
  .use(LanguageDetector)
  .init({
    //preload: ['en-US','de-DE'],
    detection: {
      caches: ['localStorage', 'cookie']
    },
    backend: {
      loadPath: '../shared/i18n/locales/{{lng}}/{{ns}}.json'
    },
    wait: true,
    lng: 'en',
    fallbackLng: 'en',
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',

    cache: {
      enabled: true
    },

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