import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {createClickTracking} from '../../lib/helperFunctions/helpers';

import {useAuth0} from '../../lib/Auth0/auth0';

const Home = ({hasSession, classes}) => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  if (hasSession || isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  const onClickLogInHandler = () => {
    createClickTracking(
      'Home Page, Log In/Sign Up Box',
      'Click Log In/Sign Up',
      'Click Log In/Sign Up Button'
    );
    loginWithRedirect({});
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} align="center">
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className={classes.pageHeader}
        >
          Baltimore Corps Talent Matching
        </Typography>
        <Grid
          container
          justify="center"
          // spacing={2}
          className={classes.cardContainer}
        >
          {Home.cardDetails.map(({header, description, imageName, url}) => (
            <Grid item key={header} xs={12} sm={8} md={5}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/logos/long.png`}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    className={classes.cardContentHeader}
                  >
                    {header}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="p"
                    align="flex-start"
                  >
                    {description}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickLogInHandler}
                  >
                    Log in / Sign up
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Home.cardDetails = [
  {
    header: 'Sign Up or Log In',
    description:
      'Create an account or log in to create a Baltimore Corps community profile.\nGet access to job opportunities and development opportunities in the Baltimore Corps network',
    imageName: 'talent',
  },
];

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

    [breakpoints.down('xs')]: {
      margin: '10px',
      padding: '6px 6px 12px 6px',
      fontSize: '18px',
    },
  },
  cardContent: {
    padding: '0px 10px',
  },
  cardContentHeader: {
    fontSize: '23px',
    margin: '10px',

    [breakpoints.down('xs')]: {
      margin: '5px',
      fontSize: '20px',
    },
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export const mapStateToProps = state => {
  return {
    hasSession: state.accounts.has_session || false,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Home));
