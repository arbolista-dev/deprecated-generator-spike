import { template } from 'lodash';

export default config => template(`
    import {get, has} from 'lodash';
    const config = <%= config %>;
    export default {
      get: (key) => get(config, key),
      has: (key) => has(config, key)
    };`)({ config: JSON.stringify(config) });
