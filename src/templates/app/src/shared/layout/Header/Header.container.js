import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'shared/redux/actions';
import selectors from 'shared/redux/selectors';

const mapStateToProps = state => ({
  loggedIn: selectors.loggedIn(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: actions.authentication.login,
  logout: actions.authentication.logout
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
