import React from 'react';
import PropTypes from '../lib/PropTypes';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import GoogleAuth from './GoogleAuth.js';
import { Divider, Segment } from 'semantic-ui-react';


import TextField from '@material-ui/core/TextField';

import {Container } from 'semantic-ui-react'
import { Grid } from '@material-ui/core';

const AuthPage = ({classes}) => {
  
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <img
          className={classes.avatar}
          src='/logos/long.png' alt='Baltimore Corps Logo'
        />
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>

        <form className={classes.form}>
          <TextField
            id='email'
            name='email'
            label='Email Address'
            required={true}
            fullWidth={true}
            autoFocus={true}
            autoComplete='email'
          />
          <TextField
            className={classes.password}
            id='password'
            name='password'
            label='Password'
            fullWidth={true}
            autoComplete='current-password'
          />
          <Button
            className={classes.submitButton}
            type='submit'
            fullWidth={true}
            variant='contained'
            color='primary'
          >
            Sign in
          </Button>
          <Button
            type=''
            fullWidth={true}
            variant='outlined'
            color='secondary'
          >
            No password? Click here
          </Button>

        </form>

        <br></br>
        <Segment basic textAlign='center'>
          <Divider horizontal> OR </Divider>
            
          <div className="col-centered">
            <GoogleAuth />
          </div>
        
        </Segment>
             

      </Paper>
    </main>
  );
}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  main: {
    width: 'auto',
    marginLeft: spacing.unit * 3,
    marginRight: spacing.unit * 3,
    [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit * 3}px`,
  },
  avatar: {
    width: '100%',
    marginBottom: spacing.unit,
  },
  password: {
    marginBottom: spacing.unit * 3,
  },
  submitButton: {
    marginBottom: spacing.unit * 3,
  },
});

export default withStyles(styles)(AuthPage);
