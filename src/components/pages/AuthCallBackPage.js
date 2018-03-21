import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as Auth0Service from '../../utils/Auth0Service';
import { auth0Actions } from '../../module/redux/modules/auth0';

class AuthCallBackPage extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { history, loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    Auth0Service.lock.on('authenticated', authResult => {
      Auth0Service.lock.getUserInfo(
        authResult.accessToken,
        (error, profile) => {
          if (error) {
            return loginError(error);
          }
          Auth0Service.setToken(authResult.idToken); // static method
          Auth0Service.setProfile(profile); // static method
          loginSuccess({ profile, token: authResult.idToken });
          history.push({ pathname: '/' });
          Auth0Service.lock.hide();
        },
      );
    });
    // Add callback for lock's `authorization_error` event
    Auth0Service.lock.on('authorization_error', error => {
      alert('authenticated!');
      loginError(error);
      history.push({ pathname: '/' });
    });
  }

  render() {
    return <h3>Loading...</h3>;
  }
}

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(auth0Actions.loginSuccess(profile)),
  loginError: error => dispatch(auth0Actions.loginError(error)),
});

export default withRouter(
  connect(
    null, // no mapStateToProps
    mapDispatchToProps,
  )(AuthCallBackPage),
);
