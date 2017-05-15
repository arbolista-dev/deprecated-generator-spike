import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from 'shared/redux/createStore';
import Layout from 'shared/layout';
import storageEngine from './storageEngine';

const store = createStore(storageEngine);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
