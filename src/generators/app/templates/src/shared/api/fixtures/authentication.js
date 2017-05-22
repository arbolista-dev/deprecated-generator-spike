import api from 'shared/api';
import { resolve } from './index';

const loginSuccess = ({ username, password: _password }) => resolve({
  data: {
    user: {
      email: `${username}@example.com`,
      username
    },
    token: '1234567890'
  }
});

const logoutSuccess = () => resolve();

const {
  login,
  logout
} = api.authentication;

login.fixtures = {
  success: loginSuccess
};

logout.fixtures = {
  success: logoutSuccess
};
