import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import reducers from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const persistConfig = {
  key: 'persistedStore',
  storage,
  blacklist: ['router', 'auth0']
};

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const rootReducer = combineReducers({
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

let store = createStore(persistedReducer, initialState, composedEnhancers);
let persistor = persistStore(store);

export {
  store,
  persistor,
}
