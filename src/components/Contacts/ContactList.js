import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import EachContact from './EachContact';

const ContactList = ({
  classes,
  contacts,
  getAllContactsShort,
  deleteContact,
}) => {
  return (
    <List className={classes.container}>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <EachContact
            contact={contact}
            key={index}
            deleteContact={deleteContact}
          />
        ))
      ) : (
        <Typography
          component="p"
          variant="body"
          align="center"
          className={classes.noResult}
        >
          No result found
        </Typography>
      )}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    })
  ),
  getAllContactsShort: PropTypes.func.isRequired,
};

const styles = ({breakpoints, spacing}) => ({
  container: {
    width: '100%',

    [breakpoints.up('sm')]: {
      width: '85%',
    },
  },
  noResult: {
    marginTop: '20px',
    width: '100%',
    fontSize: '20px',
  },
});

export default withStyles(styles)(ContactList);
