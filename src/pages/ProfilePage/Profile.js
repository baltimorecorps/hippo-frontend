import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useAuth0} from 'lib/auth0';
import Grid from '@material-ui/core/Grid';

import AddContact from '../../components/Contacts/AddContact';
import ProfilePage from './ProfilePage.container';

const LOADING_STATE = {
  notLoaded: 0,
  loading: 1,
  loaded: 2,
};

const Profile = ({accounts, addContact, getMyContact}) => {
  const {getTokenSilently, loadingAuth, user} = useAuth0();
  const [loadingState, setLoadingState] = useState(LOADING_STATE.notLoaded);

  // Loads contact associated with our account (requires us to be AuthN'd)
  const getAccountContact = async () => {
    try {
      // Don't load a bunch of times in a row
      if (loadingState === LOADING_STATE.loading) {
        return;
      }

      // getTokenSilently will fail if we're not authenticated already
      if (!user) {
        return;
      }

      setLoadingState(LOADING_STATE.loading);
      const token = await getTokenSilently();
      const result = await getMyContact(token);
      console.log(result);
      setLoadingState(LOADING_STATE.loaded);
    } catch (error) {
      setLoadingState(LOADING_STATE.notLoaded);
      console.error(error);
    }
  };

  // If we haven't started loading the contact yet, do so
  if (loadingState === LOADING_STATE.notLoaded) {
    getAccountContact();
  }

  // Show this page if we're not yet authenticated
  if (!loadingAuth && !user) {
    return <div>You are not logged in.</div>;
  }
  if (loadingState !== LOADING_STATE.loaded) {
    return <div>Loading...</div>;
  }

  let contactId = null;
  if (user.sub in accounts) {
    contactId = accounts[user.sub].id;
  }

  if (!contactId) {
    return (
      <Grid xs={12} container justify="center">
        <AddContact
          addNewContact={addContact}
          accountId={user.sub}
          emailSuggest={user.email}
        />
      </Grid>
    );
  } else {
    return <ProfilePage contactId={contactId} />;
  }
};

Profile.propTypes = {
  accounts: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  getMyContact: PropTypes.func.isRequired,
};

export default Profile;
