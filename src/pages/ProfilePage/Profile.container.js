import {connect} from 'react-redux';
import {addContact, getMyContact} from 'state/contacts';
import Profile from './Profile';
import {addNewProgram, refreshPrograms} from '../../state/programs';

export const mapStateToProps = state => {
  const keys = Object.keys(state.programs);
  return {
    programs: state.programs[keys],
    accounts: state.accounts,
  };
};

export const mapDispatchToProps = dispatch => ({
  addContact: contact => addContact(contact)(dispatch),
  getMyContact: authToken => getMyContact(authToken)(dispatch),
  addNewProgram: program => addNewProgram(program)(dispatch),
  refreshPrograms: id => refreshPrograms(id)(dispatch),
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
