import React, { PropTypes } from 'react';
import { translate } from 'react-i18next';

const Footer = ({ t }) => (
  <footer>
    {t('copyright')}
  </footer>
);

Footer.propTypes = {};

export default translate()(Footer);
