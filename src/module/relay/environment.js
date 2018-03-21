import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import { installRelayDevTools } from 'relay-devtools';
import * as Auth0Service from './../../utils/Auth0Service';

if (process.env.NODE_ENV === 'development') {
  installRelayDevTools();
}

const fetchQuery = (operation, variables) => {
  const token = !Auth0Service.isTokenExpired() && Auth0Service.getToken();

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return fetch(`https://${process.env.REACT_APP_GRAPHQL_HOST}${process.env.REACT_APP_GRAPHQL_PATH}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
};

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default modernEnvironment;
