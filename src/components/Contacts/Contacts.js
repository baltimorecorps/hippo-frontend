import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList';
// import AddContact from './AddContact';

const Contacts = props => {
  const classes = props.classes;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Profiles
        </Typography>
        <React.Fragment>
          <ContactList
            contacts={props.contacts}
            getAllContactsShort={props.getAllContactsShort}
          />
          {/* <AddContact addNewContact={props.addNewContact} dialog /> */}
        </React.Fragment>
      </Paper>
    </main>
  );
};

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  getAllContactsShort: PropTypes.func.isRequired,
  addNewContact: PropTypes.func.isRequired,
};

const styles = ({breakpoints, spacing}) => ({
  layout: {
    width: 'auto',
    marginLeft: spacing(2),
    marginRight: spacing(2),
    [breakpoints.up(600 + spacing(2 * 2))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
    padding: spacing(2),
    [breakpoints.up(600 + spacing(3 * 2))]: {
      marginTop: spacing(6),
      marginBottom: spacing(6),
      padding: spacing(3),
    },
  },
  button: {
    marginTop: spacing(3),
    marginLeft: spacing(1),
  },
});

export default withStyles(styles)(Contacts);
