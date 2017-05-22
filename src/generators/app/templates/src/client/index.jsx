import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from 'shared/redux/createStore';
import Layout from 'shared/layout';
import storageEngine from './storageEngine';

if (config.get('api.fixtures')) {
  // eslint-disable-next-line global-require
  require('shared/api/fixtures');
}

const store = createStore(storageEngine);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
