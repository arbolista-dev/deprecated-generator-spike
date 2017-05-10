import React from 'react';
import Routes from 'shared/routes';
import Header from './Header';
import '../assets/css/main.scss';

const Layout = (props) => (
  <div id="root">
    <div className="wrap">
      <Header />
      <Routes />
    </div>
  </div>
);

Layout.propTypes = {};

export default Layout;
