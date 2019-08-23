import { connect } from 'react-redux';
import TalentProfile from './TalentProfile';
import { refreshContacts } from '../../actions/contacts';

// eslint-disable-next-line no-unused-vars
const addNewContact = (dispatch) =>
  async function(contact) {
    await refreshContacts(dispatch);
  };

const mapStateToProps = (state, props) => {
  const contactId = props.match.params.contactId;
  const contactInfo = state.contacts[contactId];
  return {
    contactId: Number(contactId),
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
