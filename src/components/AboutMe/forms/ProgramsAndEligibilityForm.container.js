import {connect} from 'react-redux';
import {updateProgramApps} from 'state/contacts';
import {getAllProgramNames} from 'state/programs';
import ProgramsAndEligibilityForm from './ProgramsAndEligibilityForm';

export const mapStateToProps = state => {
  let programs = Object.values(state.programs);
  let defaultProgramApps = [];
  if (programs)
    programs.forEach(eachProgram => {
      defaultProgramApps.push({
        program: eachProgram,
        is_interested: false,
      });
    });
  return {
    defaultProgramApps,
  };
};

export const mapDispatchToProps = dispatch => ({
  getAllProgramNames: () => getAllProgramNames()(dispatch),
  updateProgramApps: (programApps, contactId) =>
    updateProgramApps(programApps, contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramsAndEligibilityForm);
