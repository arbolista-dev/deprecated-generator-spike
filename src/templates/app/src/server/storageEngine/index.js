/* eslint-disable import/prefer-default-export */
import immutableDecorator from 'redux-storage-decorator-immutablejs';

/**
 * This is not a storageEngine, but rather a generator.
 * A strorage should be initialized with every request so
 * cookies can be serialized.
 */
export const createEngine = (key, req) => {
  const storageEngine = {
    load() {
      let state = {};
      const jsonState = req.cookies[key];
      if (jsonState) {
        state = JSON.parse(jsonState);
      }
      return Promise.resolve(state);
    },

    save(state) {
      const jsonState = JSON.stringify(state);
      req.cookies[key] = jsonState;
      return Promise.resolve();
    }
  };
  return immutableDecorator(storageEngine, [
    ['authentication'],
    ['currentUser', 'attributes']
  ]);
};
/* eslint-enable import/prefer-default-export */
