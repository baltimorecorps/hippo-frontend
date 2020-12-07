import {connect} from 'react-redux';
import {
  getContactProfile,
  updateContact,
  addContactSkill,
  createAboutMe,
  updateAboutMe,
  getDynamicInstructions,
} from 'state/contacts/contacts.actions';

import ProfilePage from './ProfilePage';

// The props to this container specify which particular contact we want to
// display on the page, and we pull that contact's info out of the state

export const mapStateToProps = (state, props) => {
  const myContactId = props.contactId;
  const contactParamId =
    props.match && props.match.params && props.match.params.contactId;
  const contactId = contactParamId || myContactId;

  const contactInfo = state.contacts[contactId];
  return {
    contactId: Number(contactId),
    contactInfo,
  };
};

// Refreshes the state of all contacts (as shown above) from the API, via
// the ALL_CONTACTS event (see state/contacts.js for details)
export const mapDispatchToProps = dispatch => ({
  updateContact: contact => updateContact(contact)(dispatch),
  refreshDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
  getContactProfile: async contactId => {
    await getContactProfile(contactId)(dispatch);
  },
  createAboutMe: async contactId => {
    await createAboutMe(contactId)(dispatch);
  },

  updateAboutMe: async (contactId, aboutMe) => {
    await updateAboutMe(contactId, aboutMe)(dispatch);
  },

  addContactSkill: (contactId, skill) =>
    addContactSkill(contactId, skill)(dispatch),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

export default ProfileContainer;
