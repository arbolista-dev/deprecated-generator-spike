import { initializeI18n } from 'shared/lib/i18n';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18n = initializeI18n(
  [LanguageDetector, Cache, XHR],
  {
    detection: {
      order: ['querystring', 'localStorage'],
      caches: false
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/{{ns}}.json'
    }
  }
);

export default i18n;
