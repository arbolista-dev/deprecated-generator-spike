import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import createStore from 'shared/redux';
import App from 'shared/App';
import storageEngine from './storageEngine';

const history = createHistory();
const store = createStore(history, storageEngine);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('app')
);
