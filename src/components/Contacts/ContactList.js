import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import EachContact from './EachContact';

const ContactList = ({contacts, getAllContactsShort, deleteContact}) => {
  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded && contacts.length === 0) getAllContactsShort();

    setLoaded(true);
  }, [loaded, contacts, getAllContactsShort]);

  return (
    <List>
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

export default ContactList;
