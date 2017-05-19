/* eslint no-confusing-arrow: 0 */

import { reduce } from 'lodash';
import fixtures from 'api/http/fixtures';
import http from 'api/http';

const ApiMiddleware = (module, moduleName) => reduce(module, (result, value, key) => (
  {
    ...result,
    [key]: (data = {}, options = {}) =>
      options.fixture ? fixtures[moduleName][key](data, options) : value(data, options)
  }
), {});


/**
 * Shared code must be able to run on server and client.
 * We can't rely on webpack alias here and there is no way to
 * dynamically set babel-plugin-module-resolve alias. So the
 * best solution here is to conveniently use config so developers
 * can opt in and out of using the fixtures, but make sure to
 * exclude the unused modules from webpack bundle.
 */

export default () => reduce(http, (result, value, key) => (
  { ...result, [key]: ApiMiddleware(value, key) }
), {});

