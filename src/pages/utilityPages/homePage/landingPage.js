import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Hero from 'components/homeComponents/Hero'
import Offerings from 'components/homeComponents/Offerings'
import ProcessCarousel from 'components/homeComponents/processCarousel.js';
import ProgramDescriptions from 'components/homeComponents/programDescriptions';

import Grid from '@material-ui/core/Grid';

const LandingPage = ({hasSession, classes}) => {
  return (
    <Grid container justify="center" align="center">
      <Hero />
      <ProcessCarousel/>
      <ProgramDescriptions/>
      <Offerings />
    </Grid>
  );
};

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
  // hasSession: PropTypes.bool.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  pageHeader: {
    fontSize: '35px',
    margin: '20px ',

    [breakpoints.down('sm')]: {
      fontSize: '30px',
      margin: '18px ',
    },
    [breakpoints.down('xs')]: {
      fontSize: '20px',
      margin: '15px 15px 5px 15px',
    },
  },
  cardContainer: {
    [breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  card: {
    padding: '20px 16px',
    fontSize: '25px',
    maxWidth: '345',
    minHeight: '450',
    // height: '30vh',
    

    [breakpoints.down('xs')]: {
      margin: '10px',
      padding: '6px 6px 12px 6px',
      fontSize: '18px',
    },
  },
  cardContent: {
    padding: '0px 10px',
    height:'350px'
  },
  cardContentHeader: {
    fontSize: '55px',
    margin: '10px',

    [breakpoints.down('sm')]: {
      margin: '5px',
      fontSize: '40px',
    },
    [breakpoints.down('xs')]: {
      margin: '5px',
      fontSize: '35px',
    },
  },
  cardContentMedia:{
    width:'40%',
    height:'30%',
    minHeight:'150px'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const mapStateToProps = state => {
  return {
    // hasSession: state.auth.has_session || false,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(LandingPage));
