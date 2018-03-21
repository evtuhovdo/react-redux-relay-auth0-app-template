import * as types from './types';
import * as Auth0Service from '../../../../utils/Auth0Service';

const auth0Reducer = (
  state = {
    token: Auth0Service.getToken(),
    isAuthenticated: !Auth0Service.isTokenExpired(),
    isFetching: false,
    profile: Auth0Service.getProfile(),
    error: null
  },
  action
) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.payload.profile,
        token: action.payload.token,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        token: null,
        error: action.error
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        profile: {}
      };
    default:
      return state;
  }
};

export default auth0Reducer;
