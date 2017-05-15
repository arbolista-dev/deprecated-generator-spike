module.exports = {
  port: 3000,
  wds: false,
  error: {
    log: true
  },
  isomorphic: false,
  storage: {
    key: 'redux'
  },
  server: {
    renderErrorStack: true
  },
  api: {
    fixtures: false,
    base: 'http://localhost:3000'
  }
};
