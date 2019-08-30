import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from '../../lib/PropTypes';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const AuthPage = ({ classes }) => {
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <img className={classes.avatar} src="/logos/long.png" alt="Baltimore Corps Logo" />
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        <form className={classes.form}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            required={true}
            fullWidth={true}
            autoFocus={true}
            autoComplete="email"
          />
          <TextField
            className={classes.password}
            id="password"
            name="password"
            label="Password"
            fullWidth={true}
            autoComplete="current-password"
          />

          <Link to="/ContactForm">
            <Button
              className={classes.submitButton}
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
            >
              Log in
            </Button>
          </Link>

          <Button type="" fullWidth={true} variant="outlined" color="secondary">
            Forgot password? Click here
          </Button>
          <br />
          <br />
          <Button type="" fullWidth={true} variant="outlined" color="secondary">
            Sign Up
          </Button>
        </form>
      </Paper>
    </main>
  );
};

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  main: {
    width: 'auto',
    marginLeft: spacing(3),
    marginRight: spacing(3),
    [breakpoints.up(400 + spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: spacing(2, 3, 3),
  },
  avatar: {
    width: '100%',
    marginBottom: spacing(1),
  },
  password: {
    marginBottom: spacing(3),
  },
  submitButton: {
    marginBottom: spacing(3),
  },
});

export default withStyles(styles)(AuthPage);
