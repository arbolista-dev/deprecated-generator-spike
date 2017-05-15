import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'shared/redux/actions';

const mapStateToProps = state => ({
  authentication: state.authentication,
  user: state.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: actions.authentication.logout
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
