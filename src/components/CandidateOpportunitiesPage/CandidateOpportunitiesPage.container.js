import {connect} from 'react-redux';
import CandidateOpportunitiesPage from './CandidateOpportunitiesPage';
import {
  getAllOpportunities,
  getAllSubmittedApplications,
} from 'state/opportunity';
import {getContactProfile} from 'state/contacts';

const mapStateToProps = state => {
  const submittedIds = Object.values(state.applications)
    .filter(app => app.status !== 'draft')
    .map(app => app.opportunity && app.opportunity.id);

  const opportunities = Object.values(state.opportunities);

  const contactId = state.accounts.contact && state.accounts.contact.id;

  const contact = contactId && state.contacts[contactId];

  return {
    opportunities,
    contact,
    contactId,
    submittedIds: submittedIds,
  };
};

const mapDispatchToProps = dispatch => ({
  getContactProfile: async contactId => {
    await getContactProfile(contactId)(dispatch);
  },
  getAllOpportunities: () => getAllOpportunities(dispatch),
  getAllApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateOpportunitiesPage);
