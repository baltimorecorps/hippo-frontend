import {connect} from 'react-redux';
import {addContact, getMyContact} from 'actions/contacts';
import Profile from './Profile';

export const mapStateToProps = (state, props) => ({accounts: state.accounts});

export const mapDispatchToProps = dispatch => ({
  addContact: contact => addContact(contact)(dispatch),
  getMyContact: authToken => getMyContact(authToken)(dispatch),
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;
