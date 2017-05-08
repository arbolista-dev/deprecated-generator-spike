import Home from './Home';
import Login from './Login';

export default [
  {
    secure: false,
    component: Home,
    props: {
      path: '/',
      exact: true
    }
  }, {
    secure: false,
    component: Login,
    props: {
      path: '/login',
      exact: true
    }
  }
];
