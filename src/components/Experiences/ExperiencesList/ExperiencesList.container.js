import {connect} from 'react-redux';

import ExperiencesList from './ExperiencesList';

import {updateExperience, deleteExperience} from 'state/profile';
import {
  getDynamicInstructions,
  addExperience,
  refreshExperienceType,
} from 'state/contacts/contacts.actions';

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
  const mapStateToProps = (state, ownProps) => {
    return {
      capabilities: getCapabilities(state, ownProps),
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
  };
};

const Container = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ExperiencesList);

export default Container;
