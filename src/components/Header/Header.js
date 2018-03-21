import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { auth0Actions } from '../../module/redux/modules/auth0';

import HeaderView from './HeaderView';

const mapStateToProps = ({ auth0 }) => ({ auth0 });

const mapDispatchToProps = dispatch => ({
  loginRequest: () => dispatch(auth0Actions.loginRequest()),
  logoutSuccess: () => dispatch(auth0Actions.logoutSuccess()),
  loginSuccess: payload => dispatch(auth0Actions.loginSuccess(payload)),
  loginError: error => dispatch(auth0Actions.loginError(error)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderView),
);
