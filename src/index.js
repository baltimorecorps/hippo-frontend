import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from 'redux-starter-kit';
import rootReducer from './reducers';
import App from './App';
import {Auth0Provider} from './lib/auth0';
import config from './authConfig.json';

import * as serviceWorker from './serviceWorker';

const store = configureStore({
  reducer: rootReducer,
});

// A function that routes the user to the right place
// after login
//
// See: https://auth0.com/docs/quickstart/spa/react
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      audience={'http://localhost:5000'}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
