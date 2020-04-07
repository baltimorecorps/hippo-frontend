import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useAuth0} from 'lib/Auth0/auth0';
import Grid from '@material-ui/core/Grid';

import AddContact from 'components/Contacts/AddContact';
import ProfilePage from './ProfilePage.container';

const LOADING_STATE = {
  notLoaded: 0,
  loading: 1,
  loadedAll: 2,
};

const Profile = ({
  programs,
  hasSession,
  contact,
  addContact,
  getSession,
  createSession,
  addNewProgram,
  refreshPrograms,
}) => {
  const {getTokenSilently, loading, user, isAuthenticated} = useAuth0();
  const loadingSession = useRef(false);

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
      <AddContact
        addNewContact={addContactLocal}
        accountId={user.sub}
        emailSuggest={user.email}
      />
    </Grid>
  );
};

Profile.propTypes = {
  addContact: PropTypes.func.isRequired,
  contact: PropTypes.object,
};

export default Profile;
