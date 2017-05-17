import { resolve } from './index';

export const login = ({ username, password: _password }) => resolve({
  data: {
    user: {
      email: `${username}@example.com`,
      username
    },
    token: '1234567890'
  }
});

export const logout = _token => resolve();
