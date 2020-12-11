import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const Error404Page = ({classes}) => {
  let history = useHistory();

  return (
    <div className={classes.container} data-testid="404_page">
      <Typography
        variant="h1"
        component="h2"
        align="center"
        style={{marginTop: '20%'}}
        data-testid="404_text"
      >
        404
      </Typography>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        data-testid="pageNotFound_text"
      >
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.homeButton}
        onClick={() => history.push(`/`)}
        data-testid="homepage_button"
      >
        Home Page
      </Button>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    width: '100vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'hsl(216, 18%, 89%)',
    alignItems: 'center',
  },
  homeButton: {
    width: '200px',
    marginTop: '40px',
  },
});

export default withStyles(styles)(Error404Page);
