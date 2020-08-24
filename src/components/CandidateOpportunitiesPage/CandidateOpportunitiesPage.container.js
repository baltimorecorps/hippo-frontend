import {connect} from 'react-redux';
import CandidateOpportunitiesPage from './CandidateOpportunitiesPage';
import {
  getAllOpportunities,
  getAllSubmittedApplications,
} from 'state/opportunity';

const mapStateToProps = state => {
  const submittedIds = Object.values(state.applications)
    .filter(app => app.status !== 'draft')
    .map(app => {
      if (app.opportunity) return app.opportunity.id;
    });

  const opportunities = Object.values(state.opportunities);

  const contactId = state.accounts.contact.id;
  const contact = state.contacts[contactId];

  return {
    opportunities,
    contact,
    submittedIds: submittedIds,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  getAllApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateOpportunitiesPage);
