export default {
  port: 3000,
  wds: false,
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
  webpack: {
    hash: false,
    uglify: false
  },
  api: {
    fixtures: true
  }
};
