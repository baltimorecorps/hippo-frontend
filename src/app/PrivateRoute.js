import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      props.authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
