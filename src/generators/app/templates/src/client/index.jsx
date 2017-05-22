import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from 'shared/redux/createStore';
import Layout from 'shared/layout';
import storageEngine from './storageEngine';
import i18n from './lib/i18n';

if (config.get('api.fixtures')) {
  // eslint-disable-next-line global-require
  require('shared/api/fixtures');
}

const store = createStore(storageEngine);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout i18n={i18n} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
