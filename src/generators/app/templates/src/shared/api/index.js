import config from 'config';
import fixtures from 'api/fixtures';
import http from 'api/http';

/**
 * Shared code must be able to run on server and client.
 * We can't rely on webpack alias here and there is no way to
 * dynamically set babel-plugin-module-resolve alias. So the
 * best solution here is to conveniently use config so developers
 * can opt in and out of using the fixtures, but make sure to
 * exclude the unused modules from webpack bundle.
 */

export default () => {
  if (config.get('api.fixtures')) {
    return fixtures;
  }
  return http;
};
