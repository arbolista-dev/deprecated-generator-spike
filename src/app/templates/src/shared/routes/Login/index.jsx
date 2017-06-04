import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'shared/redux/actions';

export const Login = props => (
  <div>
    <h3>Login</h3>
    <button onClick={() => props.login({ username: 'Bob', password: 'password' })}>Login</button>
  </div>
);
Login.propTypes = {
  login: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: actions.authentication.login
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
