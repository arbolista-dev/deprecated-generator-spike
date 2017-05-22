import React from 'react';
import { I18nextProvider } from 'react-i18next';
import Routes from 'shared/routes';
import Header from './Header';
import Footer from './Footer';
import '../assets/css/main.scss';

const Layout = props => (
  <I18nextProvider i18n={props.i18n}>
    <div id="root">
      <div className="wrap">
        <Header />
        <Routes />
        <Footer />
      </div>
    </div>
  </I18nextProvider>
);

Layout.propTypes = {};

export default Layout;
