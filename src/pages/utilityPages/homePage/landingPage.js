import React from 'react';
import {connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Hero from 'components/homeComponents/Hero';
import Offerings from 'components/homeComponents/testimonials';

import ProgramDescriptions from 'components/homeComponents/programDescriptions';
import P4PCarousel from 'components/homeComponents/P4PCarousel'

import Grid from '@material-ui/core/Grid';
import {useAuth0} from 'lib/Auth0/auth0';



const LandingPage = ({hasSession}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  
  return (
    <div style={{background: '#dbe9f8'}}>
      <Grid container justify="center" align="center" >
        <Hero />
        <ProgramDescriptions  />
        <P4PCarousel  />
        <Offerings  />
      </Grid>
    </div>
  );
};




const mapStateToProps = state => {
  return {
    hasSession: state.auth.has_session || false,
  };
};


export default connect(mapStateToProps)(LandingPage);
