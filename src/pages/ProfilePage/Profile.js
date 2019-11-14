import React from 'react';
import PropTypes from 'prop-types';
import {useAuth0} from 'lib/auth0';
import Grid from '@material-ui/core/Grid';

import AddContact from '../../components/Contacts/AddContact';
import ProfilePage from './ProfilePage.container';

const Profile = ({accounts, addContact, getMyContact}) => {
  const {getTokenSilently, loading, user} = useAuth0();

  const getAccountContact = async () => {
    try {
      const token = await getTokenSilently();
      await getMyContact(token);
    } catch (error) {
      console.error(error);
    }
  };

  // Show this page if we're not yet authenticated
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  let contactId = null;
  if (user.sub in accounts) {
    contactId = accounts[user.sub].id;
  } else {
    getAccountContact();
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

ProfilePage.propTypes = {
  accounts: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
  getMyContact: PropTypes.func.isRequired,
};

export default Profile;
