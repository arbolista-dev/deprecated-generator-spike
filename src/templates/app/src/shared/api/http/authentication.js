import axios from './_axios';
import Rx from 'rxjs';

export const login = payload => (
{
  token: '123456789',
  user: { id: 1, username: 'skid' }
}
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
