import React from 'react';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {useAuth0} from 'lib/auth0';

const Home = () => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={10} align="center">
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          style={{margin: '20px', fontSize: '25px'}}
        >
          Baltimore Corps Talent Matching
        </Typography>
        <Grid container justify="center" spacing={3}>
          {Home.cardDetails.map(({header, description, imageName, url}) => (
            <Grid item key={header} xs={11} sm={8} md={5}>
              <Card style={{padding: '20px 16px'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/logos/long.png`}
                />
                <CardContent style={{padding: '0px 10px 0px 10px'}}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    style={{fontSize: '23px'}}
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
                <CardActions
                  style={{display: 'flex', justifyContent: 'center'}}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => loginWithRedirect({})}
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

export default Home;
