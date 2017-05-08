import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'shared/redux/actions';

function login(props){
  props.login('username', 'password');
}

const Login = props => (
  <button onClick={login(props)}>Login</button>
);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: actions.authentication.login
  }, dispatch)
);
export default connect(matchStateToProps, mapDispatchToProps)(Login);
