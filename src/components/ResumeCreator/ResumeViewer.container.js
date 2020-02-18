import {connect} from 'react-redux';
import {moveResumeItem} from 'state/resume';
import {refreshExperiences} from 'state/profile';
import {getContactCapabilities} from 'state/contacts';
import ResumeCreator from './ResumeCreator';

const getCapabilities = experience => {
  let capabilities = {};
  experience.achievements.forEach(achievement => {
    achievement.skills.forEach(skill => {
      if (skill.capability_id) {
        if (capabilities[skill.capability_id] === undefined) {
          capabilities[skill.capability_id] = [];
        }

        capabilities[skill.capability_id].push(skill.name);
      }
    });
  });
  return capabilities;
};

export const mapStateToProps = (state, props) => {
  let sections = {
    experience: [],
    education: [],
    portfolio: [],
    capabilities: [],
  };
  Object.values(state.experiences).forEach(exp => {
    if (exp.contact_id.toString() !== props.contactId.toString()) {
      return;
    }

    if (exp.type === 'Work' || exp.type === 'Service') {
      sections.experience.push(exp);
    } else if (exp.type === 'Education') {
      sections.education.push(exp);
    } else if (exp.type === 'Accomplishment') {
      sections.portfolio.push(exp);
    }
  });

  const contact = state.contacts[props.contactId];
  const capabilities = contact ? contact.capabilities : {};
  const otherSkills = contact ? contact.other_skills : [];

  if (capabilities) {
    sections.capabilities = Object.values(capabilities);
  }

  return {
    sections,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    moveResumeItem: (id, destination, source) => {},
    refreshExperiences: () => refreshExperiences(props.contactId)(dispatch),
    getContactCapabilities: () =>
      getContactCapabilities(props.contactId)(dispatch),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ResumeCreator);

export default Container;