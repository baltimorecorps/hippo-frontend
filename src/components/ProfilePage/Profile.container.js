import {connect} from 'react-redux';
import {addContact, getMyContact} from 'state/contacts';
import Profile from './Profile';
import {addNewProgram, refreshPrograms} from '../../state/programs';

export const mapStateToProps = state => {
  const keys = Object.keys(state.programs);
  return {
    programs: state.programs[keys],
    hasSession: state.accounts.has_session || false,
    contact: state.accounts.contact || null,
  };
};

export const mapDispatchToProps = dispatch => ({
  addContact: (fetchToken, contact) => addContact(fetchToken, contact)(dispatch),
  addNewProgram: program => addNewProgram(program)(dispatch),
  refreshPrograms: id => refreshPrograms(id)(dispatch),
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
