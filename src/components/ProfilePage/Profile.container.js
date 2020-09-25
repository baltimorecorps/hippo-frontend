import {connect} from 'react-redux';
import {addContact} from 'state/contacts';
import Profile from './Profile';

export const mapStateToProps = state => {
  return {
    hasSession: state.accounts.has_session || false,
    contact: state.accounts.contact || null,
  };
};

export const mapDispatchToProps = dispatch => ({
  addContact: (fetchToken, contact) =>
    addContact(fetchToken, contact)(dispatch),
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
