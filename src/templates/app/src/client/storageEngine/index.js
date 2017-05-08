import config from 'config';
import createCookiesEngine from 'redux-storage-engine-cookies';
import debounce from 'redux-storage-decorator-debounce';
import immutableDecorator from 'redux-storage-decorator-immutablejs';

/**
 * We use cookie storage so that the data can be seemlessly transmitted for
 * server side rendering. If more data needs to be stored than cookies can handle,
 * we should create a composite cookies and localStorage or IndexDb engine.
 */
const cookiesEngine = createCookiesEngine(config.get('storage.key'), {
  expires: config.get('storage.durationDays')
});

const immutableEngine = immutableDecorator(cookiesEngine, [
  ['authentication'],
  ['currentUser', 'attributes']
]);

export default debounce(immutableEngine, 2000);

