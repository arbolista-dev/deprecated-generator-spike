import config from 'config';
import i18next from 'i18next';

// eslint-disable-next-line import/prefer-default-export
export const initializeI18n = (middlewares, init) => {
  let i18n = i18next;
  middlewares.forEach((middleware) => {
    i18n = i18n.use(middleware);
  });
  return i18n.init({
    lngs: ['en', 'es'],
    fallbackLng: 'en',
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: config.get('i18n.debug'),
    detectLngQS: 'lng',
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format(value, format, _lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    },
    ...init
  });
};
