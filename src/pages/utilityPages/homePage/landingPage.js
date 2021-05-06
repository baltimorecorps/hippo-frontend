import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// import LandingHero from './LandingHero'
import Hero from './Hero'
// import Offerings from './Offerings'

import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import {createClickTracking} from 'lib/helperFunctions/helpers';

import ProcessCarousel from 'components/homeComponents/processCarousel.js';
import ProgramDescriptions from 'components/homeComponents/programDescriptions';





const LandingPage = ({hasSession, classes}) => {
  return (
    <>
      {/* <Offerings /> */}

      <Grid container justify="center" align="center">
        <Hero />
        <ProcessCarousel/>
        <ProgramDescriptions/>
      </Grid>
    </>
    // <LandingHero />

    // <Grid container justify="center">
    //   <Grid item xs={12} align="center">
    //     {/* <Typography
    //       gutterBottom
    //       variant="h5"
    //       component="h1"
    //       className={classes.pageHeader}
    //     >
    //       Baltimore Corps Talent Matching
    //     </Typography> */}

    //     <Grid
    //       container
    //       justify="center"
    //       // spacing={2}
    //       className={classes.cardContainer}
    //     >
    //       {LandingPage.cardDetails.map(({header, description, service, imageName, url}) => (
    //         // xs=0 sm=600 ms=960
    //         <Grid item key={header} xs={12} sm={10} md={9}>
    //           <Card className={classes.card}>
    //             {/* <CardMedia
    //               component="img"
    //               height="140"
    //               image={`/logos/temp_long.png`}
    //             /> */}

    //             <CardContent className={classes.cardContent}>
    //               {/* <h2>PLACE FOR PURPOSE</h2> */}
    //               {/* PLACE FOR PURPOSE */}
    //               <Typography
    //                 gutterBottom
    //                 variant="h1"
    //                 component="h2"
    //                 className={classes.cardContentHeader}
    //                 // className={classes.pageHeader}
    //               >
    //                 {header}
    //               </Typography>

    //               {/* SERVICE */}
    //               <Typography
    //                 gutterBottom
    //                 variant="body1"
    //                 component="p"
    //                 align="left"
    //               >
    //                 {service}
    //               </Typography>

    //               {/* DESCRIPTION */}
    //               <Typography
    //                 gutterBottom
    //                 variant="body2"
    //                 component="p"
    //                 align="left"
    //                 color='textSecondary'
    //               >
    //                 {description}
    //               </Typography>
    //             </CardContent>

    //             <CardActions className={classes.cardActions}>
    //               {/* BUTTON */}
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={onClickLogInHandler}
    //               >
    //                 Log in / Sign up
    //               </Button>
    //             </CardActions>
    //           </Card>
    //         </Grid>
    //       ))}
    //     </Grid>
        
    //   </Grid>
    // </Grid>
  );
};

LandingPage.cardDetails = [
  {
    header: 'PLACE FOR PURPOSE',
    description:
      'Create an account or log in to create a Baltimore Corps community profile.\nGet access to job opportunities and development opportunities in the Baltimore Corps network',
    service: 'is a service that connects talented community members facing challenges finding employment in the social impact sector with organizations that have taken an internal and external commitment to equity and racial justice.',
    imageName: 'talent',
  },
];
//     <Grid container justify="center" align="center">
//       <ProcessCarousel/>
//       <ProgramDescriptions/>
//     </Grid>
//   )
// };



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
    // display: 'flex',
    // alignItems: 'center',
    // outline: '5px solid red',

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
    // fontSize: 'calc(1.5rem + 1vw)',
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
