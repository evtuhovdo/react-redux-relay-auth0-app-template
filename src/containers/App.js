import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryRenderer, graphql } from 'react-relay';

import modernEnvironment from './../module/relay/environment';
import UserInfo from './../components/Header/includes/UserInfo';
import IndexPage from '../components/pages/IndexPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import AuthCallBackPage from '../components/pages/AuthCallBackPage';

class App extends Component {
  render() {
    return (
      <div>
        <QueryRenderer
          environment={modernEnvironment}
          query={graphql`
            query AppQuery {
              viewer {
                user {
                  ...UserInfo_user
                }
              }
            }
          `}
          variables={{}}
          render={({ error, props }) => {
            if (props) {
              return <UserInfo user={props.viewer.user}/>;
            }

            return <div>Loading</div>;
          }}
        />
        <Router>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/callback" component={AuthCallBackPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
