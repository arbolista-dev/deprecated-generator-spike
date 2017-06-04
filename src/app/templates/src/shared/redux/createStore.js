import config from 'config';
import { createEpicMiddleware } from 'redux-observable';
import reduxReset from 'redux-reset';
import reduxCatch from 'redux-catch';
import * as storage from 'redux-storage';
import { createStore, applyMiddleware, compose } from 'redux';

import epics from './epics';
import reducers from './reducers';

const errorHandler = (error, _getState, lastAction, _dispatch) => {
  if (config.get('error.log')) {
    console.error('REDUX ERROR HANDLER');
    console.error('lastAction', lastAction);
    console.error(error);
  }
  // optionally dispatch an action due to the error using the dispatch parameter
};

export default (storageEngine) => {
  const storageMiddleware = storage.createMiddleware(storageEngine);
  const middleware = applyMiddleware(
    storageMiddleware,
    reduxCatch(errorHandler),
    createEpicMiddleware(epics),
  );

  let composeEnhancers = compose;
  if (typeof window !== 'undefined' && config.get('redux.devTools')) {
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  const enhancers = composeEnhancers(middleware, reduxReset());
  const createStoreWithMiddleware = enhancers(createStore);

  const storedReducers = storage.reducer(reducers);
  return createStoreWithMiddleware(storedReducers);
};
