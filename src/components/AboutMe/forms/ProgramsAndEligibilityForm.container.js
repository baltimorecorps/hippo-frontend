import {connect} from 'react-redux';
import {
  updateProgramApps,
  updateAboutMe,
  getDynamicInstructions,
} from 'state/contacts';
import {getAllProgramNames} from 'state/programs';
import ProgramsAndEligibilityForm from './ProgramsAndEligibilityForm';
import {defaultPrograms} from '../defaultData';

export const mapStateToProps = state => {
  const programs = Object.values(state.programs);
  let defaultProgramApps = defaultPrograms;

  if (programs) {
    programs.forEach((eachProgram, index) => {
      defaultProgramApps[index] = {
        program: eachProgram,
        is_interested: false,
      };
    });
  }

  return {
    defaultProgramApps,
  };
};

export const mapDispatchToProps = dispatch => ({
  getAllProgramNames: () => getAllProgramNames()(dispatch),
  updateProgramApps: (programApps, contactId) =>
    updateProgramApps(programApps, contactId)(dispatch),
  updateAboutMe: async (contactId, aboutMe) => {
    await updateAboutMe(contactId, aboutMe)(dispatch);
  },
  refreshDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramsAndEligibilityForm);
