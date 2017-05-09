import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Layout from './layout';

const App = ({store, history}) => (
  <Provider store={store}>
    <Router history={syncHistoryWithStore(history, store)}>
      <Layout/>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default App;
