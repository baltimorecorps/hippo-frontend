import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
// import withStyles from '@material-ui/core/styles/withStyles';

import Hero from 'components/homeComponents/Hero';
import Offerings from 'components/homeComponents/Offerings';
import ProcessCarousel from 'components/homeComponents/processCarousel.js';
import OpportunitiesPeak from 'components/homeComponents/opportunitiesPeak.js';
import ProgramDescriptions from 'components/homeComponents/programDescriptions';
import P4PCarousel from 'components/homeComponents/P4PCarousel'

import Grid from '@material-ui/core/Grid';
import {createClickTracking} from 'lib/helperFunctions/helpers';

import {useAuth0} from 'lib/Auth0/auth0';

// import Container from '@material-ui/core/Container';


const LandingPage = ({hasSession, classes}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  // if (hasSession || isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // }

  const onClickLogInHandler = () => {
    createClickTracking(
      'Home Page, Log In/Sign Up Box',
      'Click Log In/Sign Up',
      'Click Log In/Sign Up Button'
    );
    loginWithRedirect({});
  };

  return (
    <div style={{background: '#dbe9f8'}}>
      <Grid container justify="center" align="center" xs={12}>
        <Hero />
        <ProgramDescriptions/>
        <P4PCarousel onclick={onClickLogInHandler} />
        <OpportunitiesPeak/>
        <Offerings onclick={onClickLogInHandler} />
      </Grid>
    </div>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  // hasSession: PropTypes.bool.isRequired,
};

// const styles = ({breakpoints, palette, spacing}) => ({
//   pageHeader: {
//     fontSize: '35px',
//     margin: '20px ',

//     [breakpoints.down('sm')]: {
//       fontSize: '30px',
//       margin: '18px ',
//     },
//     [breakpoints.down('xs')]: {
//       fontSize: '20px',
//       margin: '15px 15px 5px 15px',
//     },
//   },
//   cardContainer: {
//     [breakpoints.down('xs')]: {
//       padding: '0px',
//     },
//   },
//   card: {
//     padding: '20px 16px',
//     fontSize: '25px',
//     maxWidth: '345',
//     minHeight: '450',
//     // height: '30vh',
    

//     [breakpoints.down('xs')]: {
//       margin: '10px',
//       padding: '6px 6px 12px 6px',
//       fontSize: '18px',
//     },
//   },
//   cardContent: {
//     padding: '0px 10px',
//     height:'350px'
//   },
//   cardContentHeader: {
//     fontSize: '55px',
//     margin: '10px',

//     [breakpoints.down('sm')]: {
//       margin: '5px',
//       fontSize: '40px',
//     },
//     [breakpoints.down('xs')]: {
//       margin: '5px',
//       fontSize: '35px',
//     },
//   },
//   cardContentMedia:{
//     width:'40%',
//     height:'30%',
//     minHeight:'150px'
//   },
//   cardActions: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
// });

export const mapStateToProps = state => {
  return {
    // hasSession: state.auth.has_session || false,
  };
};

export default connect(mapStateToProps)(LandingPage);
