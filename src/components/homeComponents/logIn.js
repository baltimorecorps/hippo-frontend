import React from 'react';
import {connect} from 'react-redux';


import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import {useAuth0} from 'lib/Auth0/auth0';

const LogInAction = ({hasSession, text}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();



  const onClickLogInHandler = () => {
    createClickTracking(
      'Home Page, Log In/Sign Up Box',
      'Click Log In/Sign Up',
      'Click Log In/Sign Up Button'
    );
    loginWithRedirect({});
  };



  return(
      <>
    { hasSession ? '':
        <CardActions>
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onClickLogInHandler}
        style={{ margin: '4% auto 0'}}
        >
        {text}
        </Button>
        </CardActions>
    }
    </>
)}

export const mapStateToProps = state => {
    return {
      hasSession: state.auth.has_session || false,
    };
};

export default connect(mapStateToProps)(LogInAction)