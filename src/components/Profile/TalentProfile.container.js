import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import TalentProfile from './TalentProfile';
import { refreshContacts } from '../../actions/contacts';

const addNewContact = (dispatch) =>
  async function(contact) {
    await refreshContacts(dispatch);
  };

const mapStateToProps = (state, props) => {
  const contactId = props.match.params.contactId;
  const contactInfo = state.contacts.find(c => 
    c.id.toString() === contactId.toString());
  return {
    contactId,
    contactInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  refreshContacts: () => refreshContacts(dispatch),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TalentProfile);

export default ProfileContainer;
