import React, {useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import EachContact from './EachContact';

const ContactList = ({contacts, deleteContact, classes}) => {
  const totalContacts = contacts.length;

  let [isLoading, setIsLoading] = useState(false);
  const [loadMoreContactsCount, setLoadMoreContactsCount] = useState(1);
  const [showContacts, setShowContacts] = useState(
    contacts.slice(0, 100) || null
  );

  useEffect(() => {
    setShowContacts(contacts.slice(0, 100 * loadMoreContactsCount));
    setIsLoading(false);
  }, [loadMoreContactsCount, setShowContacts, contacts]);

  const onClickLoadMoreContacts = () => {
    setIsLoading(true);
    setLoadMoreContactsCount(loadMoreContactsCount + 1);
  };

  return (
    <List>
      {showContacts ? (
        <React.Fragment>
          {showContacts.map((contact, index) => (
            <EachContact
              contact={contact}
              key={index}
              deleteContact={deleteContact}
            />
          ))}
          {isLoading ? (
            <Typography
              component="p"
              variant="body1"
              align="center"
              className={classes.loading}
            >
              Loading contacts....
            </Typography>
          ) : showContacts.length < totalContacts ? (
            <Typography
              data-testid="load_more_contacts_button"
              component="p"
              variant="body1"
              align="center"
              className={classes.loadMoreContacts}
              onClick={() => onClickLoadMoreContacts()}
            >
              Load more contacts
            </Typography>
          ) : null}
        </React.Fragment>
      ) : (
        <Typography
          component="p"
          variant="body1"
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
      width: '95%',
    },
  },
  noResult: {
    marginTop: '20px',
    width: '100%',
    fontSize: '20px',
  },
  loadMoreContacts: {
    marginTop: '20px',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  loading: {
    marginTop: '20px',
    color: '#878787',
  },
});

export default withStyles(styles)(ContactList);
