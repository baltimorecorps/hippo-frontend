import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import EachContact from './EachContact';

const ContactList = ({contacts, getAllContacts, deleteContact, classes}) => {
  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded && contacts.length === 0) getAllContacts();

    setLoaded(true);
  }, [loaded, contacts, getAllContacts]);

  return (
    <List>
      {contacts ? (
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
  getAllContacts: PropTypes.func.isRequired,
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
