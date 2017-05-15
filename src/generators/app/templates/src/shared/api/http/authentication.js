import axios from './_axios';

export const login = payload => (
  axios({
    method: 'POST',
    url: '/v1/login',
    data: payload
  })
);


export const logout = token => (
  axios({
    method: 'POST',
    url: '/v1/logout',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
);
