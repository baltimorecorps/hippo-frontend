import {connect} from 'react-redux';
import {addContact} from 'state/contacts/contacts.actions';
import Profile from './Profile';

export const mapStateToProps = state => {
  return {
    hasSession: state.auth.has_session || false,
    contact: state.auth.contact || null,
  };
};

export const mapDispatchToProps = dispatch => ({
  addContact: (fetchToken, contact) =>
    addContact(fetchToken, contact)(dispatch),
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
