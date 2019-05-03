import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList.container';
import AddContact from './AddContact';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const Contacts = ({classes, addContact}) => (
  <main className={classes.layout}>
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h4" align="center">
        Profiles
      </Typography>
      <React.Fragment>
        <ContactList />
        <AddContact addContact={addContact} />
      </React.Fragment>
    </Paper>
  </main>
);

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
};

export default withStyles(styles)(Contacts);
