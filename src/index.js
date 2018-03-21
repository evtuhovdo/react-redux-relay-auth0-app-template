import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './module/redux/store';

import App from './containers/App';

const target = document.getElementById('root');

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  target,
);

registerServiceWorker();
