import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import EachContact from './EachContact';

const ContactList = ({
  classes,
  contacts,
  getAllContactsShort,
  deleteContact,
}) => {
  let [loaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState(contacts);

  useEffect(() => {
    if (!loaded) getAllContactsShort();

    setLoaded(true);
  }, [loaded, contacts, getAllContactsShort]);

  useEffect(() => {
    if (profiles.length !== contacts.length) getAllContactsShort();

    setProfiles(contacts);
  }, [contacts, getAllContactsShort, profiles]);

  return (
    <List>
      {profiles &&
        profiles.map((contact, index) => (
          <EachContact
            contact={contact}
            key={index}
            deleteContact={deleteContact}
            setLoaded={setLoaded}
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
