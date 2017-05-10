module.exports = {
  port: 3000,
  wds: true,
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
    fixtures: true
  }
};
