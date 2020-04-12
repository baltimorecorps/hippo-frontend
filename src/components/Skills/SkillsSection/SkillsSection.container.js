import {connect} from 'react-redux';
import {
  addContactSkill,
  deleteContactSkill,
  addSkillSuggestion,
  deleteSkillSuggestion,
  updateContactSkills,
  getContactCapabilities,
} from 'state/contacts';
import {getCapabilities} from 'state/capabilities';
import SkillsSection from './SkillsSection';

export const mapStateToProps = (state, props) => {
  let contactId = null;
  if (props.contactId) {
    contactId = props.contactId;
  } else if (!props.contactId && state.accounts.contact) {
    contactId = state.accounts.contact.id;
  }

  const contact = contactId ? state.contacts[contactId] : null;
  let contactCapabilities = null;
  let allSkills = null;
  let otherSkills = null;
  if (contact && contact.capabilities) {
    contactCapabilities = contact.capabilities;
  }
  if (contact && contact.skills) {
    allSkills = contact.skills;
  }
  if (contact && contact.other_skills) {
    otherSkills = contact.other_skills;
  }

  return {
    contactId,
    capabilities: state.capabilities,
    contactCapabilities,
    allSkills,
    otherSkills,
  };
};

export const mapDispatchToProps = dispatch => ({
  getCapabilities: getCapabilities(dispatch),
  getContactCapabilities: contactId =>
    getContactCapabilities(contactId)(dispatch),
  addContactSkill: (contactId, skill) =>
    addContactSkill(contactId, skill)(dispatch),
  deleteContactSkill: (contactId, skill) =>
    deleteContactSkill(contactId, skill)(dispatch),
  updateContactSkills: (contactId, skills) =>
    updateContactSkills(contactId, skills)(dispatch),
  addSkillSuggestion: (contactId, capabilityId, skill) =>
    addSkillSuggestion(contactId, capabilityId, skill)(dispatch),
  deleteSkillSuggestion: (contactId, capabilityId, skill) =>
    deleteSkillSuggestion(contactId, capabilityId, skill)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsSection);
