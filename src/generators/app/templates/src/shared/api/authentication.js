import axios from './helpers/axios';

export const login = payload => (
  axios({
    method: 'POST',
    url: '/v1/login',
    data: payload
  })
);


export const logout = payload => (
  axios({
    method: 'POST',
    url: '/v1/logout',
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })
);
