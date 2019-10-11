import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const BasicInfoDisplay = ({ firstName, lastName, email, phone, classes }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5" component="h1">
            {firstName} {lastName}
          </Typography>

          <Typography gutterBottom variant="body1" component="p">
            <Icon>mail</Icon> {email}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            <Icon>phone</Icon> {phone}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

BasicInfoDisplay.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  paper: {
    padding: spacing(2, 3, 3),
    margin: spacing(5, 0),
  },
});

export default withStyles(styles)(BasicInfoDisplay);
