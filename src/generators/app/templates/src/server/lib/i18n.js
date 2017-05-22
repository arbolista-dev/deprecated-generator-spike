import path from 'path';
import { initializeI18n } from 'shared/lib/i18n';
import Backend from 'i18next-node-fs-backend';
import middleware, { LanguageDetector } from 'i18next-express-middleware';

const i18n = initializeI18n(
  [Backend, LanguageDetector],
  {
    detection: {
      order: ['querystring'],
      caches: false
    },
    backend: {
      loadPath: path.resolve(__dirname, '..', 'shared/assets/locales/{{lng}}/{{ns}}.json')
    }
  }
);

export default middleware.handle(i18n, {
  ignoreRoutes: ['/assets'],
  removeLngFromUrl: false
});
