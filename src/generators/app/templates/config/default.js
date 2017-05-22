module.exports = {
  port: 3000,
  wds: false,
  error: {
    log: true
  },
  isomorphic: false,
  storage: {
    key: 'redux',
    durationDays: 1
  },
  server: {
    renderErrorStack: true
  },
  api: {
    fixtures: false,
    base: 'http://localhost:3000'
  },
  i18n: {
    debug: false
  },
  redux: {
    devTools: false
  }
};
