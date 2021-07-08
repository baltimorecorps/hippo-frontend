import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';


import store from './state/store.js';
import App from 'app/App.container';
import {Auth0Provider} from 'lib/Auth0/auth0';
import config from 'app/authConfig.json';
import {API_URL} from 'app/constants';

import * as serviceWorker from 'app/serviceWorker';


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
      audience={API_URL}
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
