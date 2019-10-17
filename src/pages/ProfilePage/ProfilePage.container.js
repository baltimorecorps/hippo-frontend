import {connect} from "react-redux";
import {refreshContacts} from "actions/contacts";
import ProfilePage from "./ProfilePage";

// eslint-disable-next-line no-unused-vars
const addNewContact = dispatch =>
  async function(contact) {
    await refreshContacts(dispatch);
  };

// (DK 2019-09-12)
// The state that the top level page uses is mostly the contact state,
// which looks like this:
// {
//   contacts: {
//     <contact1 id>: { <contact1 details> },
//     <contact2 id>: { <contact2 details> },
//     ...
//   },
//   ...
// }
//
// The props to this container specify which particular contact we want to
// display on the page, and we pull that contact's info out of the state
const mapStateToProps = (state, props) => {
  const contactId = props.match.params.contactId;
  const contactInfo = state.contacts[contactId];
  return {
    contactId: Number(contactId),
    contactInfo,
  };
};

// Refreshes the state of all contacts (as shown above) from the API, via
// the ALL_CONTACTS event (see reducers/contacts.js for details)
const mapDispatchToProps = dispatch => ({
  refreshContacts: () => refreshContacts(dispatch),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);

export default ProfileContainer;
