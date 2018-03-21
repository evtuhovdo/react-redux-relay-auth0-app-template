import React from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import { connect } from 'react-redux';

class UserInfo extends React.Component {
  componentWillReceiveProps(prevProps) {
    if (prevProps.auth0.isAuthenticated !== this.props.auth0.isAuthenticated) {
      this.props.relay.refetch();
    }
  };

  render() {
    const { user } = this.props;

    if (user === null) {
      return <div>гость</div>;
    }

    return <div>user id = {user.id}</div>;
  }
}

const mapStateToProps = ({ auth0 }) => ({ auth0 });

const ConnectedUserInfo = connect(mapStateToProps)(UserInfo);

export default createRefetchContainer(
  ConnectedUserInfo,
  {
    user: graphql`
        fragment UserInfo_user on User {
            id
        }
    `,
  },
  graphql`
      query UserInfoRefetchQuery {
          viewer {
              user {
                  ...UserInfo_user
              }
          }
      }
  `
);
