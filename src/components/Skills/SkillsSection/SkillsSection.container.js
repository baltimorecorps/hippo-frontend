import {connect} from 'react-redux';
import {
  addContactSkill,
  deleteContactSkill,
  addSkillSuggestion,
  getContactCapabilities,
} from 'state/contacts';
import {getCapabilities} from 'state/capabilities';
import SkillsSection from './SkillsSection';

export const mapStateToProps = state => {
  const contactId = state.accounts.contact ? state.accounts.contact.id : null;
  const contact = contactId ? state.contacts[contactId] : null;
  return {
    contact,
    capabilities: state.capabilities,
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
  addSkillSuggestion: (contactId, capabilityId, skill) =>
    addSkillSuggestion(contactId, capabilityId, skill)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsSection);
