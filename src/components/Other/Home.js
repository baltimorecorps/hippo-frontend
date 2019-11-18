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
      <Grid item xs={10}>
        <Typography gutterBottom variant="h3" component="h1">
          Baltimore Corps Talent Matching
        </Typography>
        <Grid container justify="center" spacing={3}>
          {Home.cardDetails.map(({header, description, imageName, url}) => (
            <Grid item key={header} xs={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/images/${imageName}.jpeg`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {header}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="p">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
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
    header: 'Sign up or log in',
    description:
      'Create an account or log in to create a Baltimore Corps community profile.\nGet access to job opportunities and development opportunities in the Baltimore Corps network',
    imageName: 'talent',
  },
];

export default Home;
