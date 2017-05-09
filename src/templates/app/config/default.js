module.exports = {
  port: 3000,
  wds: true,
  error: {
    log: true
  },
  isomorphic: true,
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
