import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import EachContact from './EachContact';

const ContactList = ({
  classes,
  contacts,
  getAllContactsShort,
  deleteContact,
}) => {
  return (
    <List className={classes.container}>
      {contacts &&
        contacts.map((contact, index) => (
          <EachContact
            contact={contact}
            key={index}
            deleteContact={deleteContact}
          />
        ))}
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
});

export default withStyles(styles)(ContactList);
