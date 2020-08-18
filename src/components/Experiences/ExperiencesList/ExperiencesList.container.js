import {connect} from 'react-redux';
import {createSelector} from 'redux-starter-kit';
import {
  RESUME_CREATION,
  selectResumeExperience,
  deselectResumeExperience,
} from 'state/resume';
import ExperiencesList from './ExperiencesList';

import {
  // addExperience,
  // refreshExperienceType,
  updateExperience,
  deleteExperience,
} from 'state/profile';
import {
  getDynamicInstructions,
  addExperience,
  refreshExperienceType,
} from 'state/contacts';

const getExperiences = createSelector(['experiences'], experiences =>
  Object.keys(experiences).map(id => experiences[id])
);

const getContact = (state, props) => props.contactId;
const getTypeFilter = (state, props) => props.experienceType;

// const makeGetRelevantExperiences = () => {
//   const getRelevantExperiences = createSelector(
//     [getExperiences, getContact, getTypeFilter],
//     (exps, contactId, type) =>
//       exps
//         .filter(exp => exp.contact_id.toString() === contactId.toString())
//         .filter(exp => exp.type === type)
//   );
//   return getRelevantExperiences;
// };

const getCapabilities = (state, props) => {
  const contact = state.contacts[props.contactId];
  const capabilities = contact ? contact.capabilities : {};
  const otherSkills = contact ? contact.other_skills : [];
  let output = [];
  Object.values(capabilities || {}).forEach(capability => {
    const allSkills = capability.skills.concat(capability.suggested_skills);
    if (allSkills.length > 0) {
      output.push({
        id: capability.id,
        name: capability.name,
        skills: allSkills,
      });
    }
  });
  if (otherSkills && otherSkills.length > 0) {
    output.push({
      id: null,
      name: 'Other',
      skills: otherSkills,
    });
  }
  return output;
};

export const makeMapStateToProps = () => {
  // const getRelevantExperiences = makeGetRelevantExperiences();
  const mapStateToProps = (state, ownProps) => {
    return {
      // experiences: getRelevantExperiences(state, ownProps),
      capabilities: getCapabilities(state, ownProps),
      inSelectMode:
        state.resume.resumeCreationStep === RESUME_CREATION.SELECT_HIGHLIGHTS,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    refreshDynamicInstructions: () =>
      getDynamicInstructions(props.contactId)(dispatch),
    addNewExperience: experience => addExperience(experience)(dispatch),
    updateExperience: experience => updateExperience(experience)(dispatch),
    deleteExperience: experience => deleteExperience(experience)(dispatch),
    refreshExperiences: () =>
      refreshExperienceType(props.contactId, props.experienceType)(dispatch),
    selectExperience: experience =>
      dispatch(selectResumeExperience(experience)),
    deselectExperience: experience =>
      dispatch(deselectResumeExperience(experience)),
  };
};

const Container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ExperiencesList);

export default Container;
