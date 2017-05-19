import axios from './_axios';

export const login = (payload, options) => (
  axios({
    method: 'POST',
    url: '/v1/login',
    data: payload
  })
);


export const logout = (payload, options) => (
  axios({
    method: 'POST',
    url: '/v1/logout',
    headers: {
      Authorization: `Bearer ${payload.token}`
    }
  })
);
