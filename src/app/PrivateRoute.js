import React from 'app/node_modules/react';
import {Redirect, Route} from 'app/node_modules/react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      props.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
