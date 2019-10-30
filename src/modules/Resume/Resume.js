import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const Resume = ({ match, classes }) => {
  const gdocId = match.params.gdocId;
  return (
    <Grid container justify="center">
      <div className={classes.container}>
        <Button variant="outlined" className={classes.button}>Back to profile</Button>
        <Paper className={classes.paper}>
        <iframe className={classes.frame} src={`https://docs.google.com/document/d/${gdocId}/pub?embedded=true`}>
        </iframe>
        </Paper>
      </div>
    </Grid>
  );
};

const styles = ({ breakpoints, palette, spacing }) => ({
  paper: {
    padding: spacing(1)
  },
  container: {
    display: 'inline',
  },
  button: {
    marginBottom: spacing(1),
  },
  frame: {
    border: 'none',
    minWidth: '800px',
    minHeight: '800px',
  },
});

export default withStyles(styles)(Resume);
