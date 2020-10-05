import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAuth0} from 'lib/Auth0/auth0';
import Grid from '@material-ui/core/Grid';

import AddContact from 'components/Contacts/AddContact';
import ProfilePage from './ProfilePage.container';

const Profile = ({
  hasSession,
  contact,
  addContact,
  getSession,
  createSession,
}) => {
  const {getTokenSilently, loading, user} = useAuth0();

  const addContactLocal = contact => addContact(getTokenSilently, contact);
  if (contact) {
    return <ProfilePage contactId={contact.id} />;
  }

  // Show this page if we're not yet authenticated
  if (!loading && !user) {
    return <div>You are not logged in.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container justify="center">
      <Delayed>
        <AddContact
          addNewContact={addContactLocal}
          accountId={user.sub}
          emailSuggest={user.email}
        />
      </Delayed>
    </Grid>
  );
};

Profile.propTypes = {
  addContact: PropTypes.func.isRequired,
  contact: PropTypes.object,
};

const Delayed = ({children, waitBeforeShow = 2000}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : <div>Loading...</div>;
};

export default Profile;
