import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Auth0Service from './../../utils/Auth0Service';

class HeaderView extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    auth0: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      profile: PropTypes.object,
      error: PropTypes.object
    }).isRequired,
    loginRequest: PropTypes.func.isRequired,
    logoutSuccess: PropTypes.func.isRequired
  };

  handleLoginClick = () => {
    Auth0Service.login();
    this.props.loginRequest();
  };

  componentWillMount() {
    const { history, loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    Auth0Service.lock.on('authenticated', authResult => {
      console.log('authenticated');
      Auth0Service.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        Auth0Service.setToken(authResult.idToken); // static method
        Auth0Service.setProfile(profile); // static method
        loginSuccess(profile);
        history.push({ pathname: '/' });
        Auth0Service.lock.hide();
      });
    });
    // Add callback for lock's `authorization_error` event
    Auth0Service.lock.on('authorization_error', error => {
      loginError(error);
      history.push({ pathname: '/' });
    });
  }

  handleLogoutClick = () => {
    this.props.logoutSuccess();
    Auth0Service.logout(); // careful, this is a static method
    this.props.history.push({ pathname: '/' });
  };

  render() {
    const { auth0 } = this.props;

    const avatarStyle = {
      borderRadius: 40,
      height: 40,
      width: 40,
      backgroundColor: '#2c2c2c',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
  };

    if (auth0.isAuthenticated && auth0.profile.picture) {
      avatarStyle.backgroundImage = `url("${auth0.profile.picture}")`;
    }

    return (
      <div>
        {auth0.isAuthenticated ? (
          <div>
            <div style={avatarStyle}/>
            <span>{auth0.profile.name}</span>
            <button onClick={this.handleLogoutClick}>Logout</button>
          </div>
        ) : (
          <button onClick={this.handleLoginClick}>Login</button>
        )}
        {auth0.error && <p>{JSON.stringify(auth0.error)}</p>}
      </div>
    );
  }
}

export default HeaderView;
