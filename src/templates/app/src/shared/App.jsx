import { ConnectedRouter } from 'react-router-redux';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Layout from './layout';

const App = ({store, history}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout/>
    </ConnectedRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired
};

export default App;
