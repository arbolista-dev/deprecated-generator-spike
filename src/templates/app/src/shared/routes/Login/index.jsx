import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from 'shared/redux/actions';

const Login = props => (
  <div>
    <h3>Login</h3>
    <button onClick={()=>props.login({username: 'Bob', password: 'password'})}>Login</button>
  </div>
);

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    login: actions.authentication.login
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
