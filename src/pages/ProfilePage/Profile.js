import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAuth0} from 'lib/auth0';
import Grid from '@material-ui/core/Grid';

import AddContact from '../../components/Contacts/AddContact';
import ProfilePage from './ProfilePage.container';

const LOADING_STATE = {
  notLoaded: 0,
  loading: 1,
  loadedAll: 2,
};

const Profile = ({
  accounts,
  programs,
  addContact,
  getMyContact,
  addNewProgram,
  refreshPrograms,
}) => {
  const {getTokenSilently, loadingAuth, user, logout} = useAuth0();
  const [loadingState, setLoadingState] = useState(LOADING_STATE.notLoaded);

  // const PFPProgram = {
  //   program_id: 1,
  //   card_id: 'card',
  //   is_approved: false,
  //   is_active: true,
  //   stage: 1,
  //   responses: [
  //     {
  //       program_contact_id: 1,
  //       question_id: 1,
  //       response_text: '',
  //     },
  //     {
  //       program_contact_id: 1,
  //       question_id: 2,
  //       response_text: '',
  //     },
  //   ],
  // };

  useEffect(() => {
    if (loadingState === LOADING_STATE.notLoaded)
      // Loads contact associated with our account (requires us to be AuthN'd)
      (async () => {
        try {
          // getTokenSilently will fail if we're not authenticated already
          if (!user) {
            return;
          }

          setLoadingState(LOADING_STATE.loading);
          const token = await getTokenSilently();
          const result = await getMyContact(token);
          console.log(result);
          setLoadingState(LOADING_STATE.loadedAll);

          // let id = null;
          // let programResult = null;

          // // Checking if this account with a token has a profile in this application
          // if (result.body) {
          //   id = result.body.data.id;
          //   programResult = await refreshPrograms(id);
          //   if (programResult.body.data[0]) {
          //     console.log(
          //       'This contact is already in PFP program.',
          //       programResult
          //     );
          //     setLoadingState(LOADING_STATE.loadedAll);
          //   } else {
          //     PFPProgram.contact_id = id;
          //     programResult = await addNewProgram(PFPProgram);
          //     console.log('adding contact to new program (PFP)', programResult);
          //     setLoadingState(LOADING_STATE.loadedAll);
          //   }
          // } else {
          //   // This is to handle when account has token but never create a profile before [GetMyContact REJECT]
          //   // So it will skip this part and go to create profile form page.
          //   setLoadingState(LOADING_STATE.loadedAll);
          // }
        } catch (error) {
          setLoadingState(LOADING_STATE.notLoaded);
          console.error(error);
        }
      })();
  }, [
    user,
    loadingState,
    getMyContact,
    getTokenSilently,
    // addNewProgram,
    // refreshPrograms,
    // programs,
    // PFPProgram,
  ]);

  // Show this page if we're not yet authenticated
  if (!loadingAuth && !user) {
    return <div>You are not logged in.</div>;
  }
  if (loadingState !== LOADING_STATE.loadedAll) {
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
