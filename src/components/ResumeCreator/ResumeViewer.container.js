import {connect} from 'react-redux';
import {refreshExperiences} from 'state/profile';
import {getContact, getContactCapabilities} from 'state/contacts/contacts.actions';
import ResumeCreator from './ResumeCreator';

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
  const capabilities = contact ? {...contact.capabilities} : {};
  const otherSkills = contact ? contact.other_skills : [];

  if (capabilities) {
    if (otherSkills) {
      capabilities['cap:other'] = {
        id: 'cap:other',
        name: 'Other Skills',
        skills: otherSkills,
        suggested_skills: [],
      };
    }
    sections.capabilities = Object.values(capabilities);
  }

  return {
    sections,
    contact,
  };
};

export const mapDispatchToProps = (dispatch, props) => {
  return {
    refreshExperiences: () => refreshExperiences(props.contactId)(dispatch),
    getContact: () => getContact(props.contactId)(dispatch),
    getContactCapabilities: () =>
      getContactCapabilities(props.contactId)(dispatch),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ResumeCreator);

export default Container;
