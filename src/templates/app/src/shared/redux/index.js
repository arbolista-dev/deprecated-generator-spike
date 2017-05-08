import config from 'config';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import reduxReset from 'redux-reset';
import reduxCatch from 'redux-catch';
import * as storage from 'redux-storage';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import epics from './epics';
import reducers from './reducers';

const errorHandler = (error, _getState, _lastAction, _dispatch) => {
  if (config.get('error.log')) {
    console.error(JSON.stringify(error));
    console.debug('current state', getState());
    console.debug('last action was', lastAction);
  }
  // optionally dispatch an action due to the error using the dispatch parameter
};

export default (history, storageEngine) => {
  const middleware = applyMiddleware(
    reduxCatch(errorHandler),
    storageMiddleware,
    logger(),
    routerMiddleware(history),
    createEpicMiddleware(epics),
  );

  let composeEnhancers = compose;
  if (typeof window !== 'undefined' && config.get('redux.devTools')) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }
  const enhancers = composeEnhancers(middleware, reduxReset());
  const createStoreWithMiddleware = enhancers(createStore);

  const storageMiddleware = storage.createMiddleware(storageEngine);
  const storedReducers = storage.reducer(reducers);
  return createStoreWithMiddleware(storedReducers);
};
