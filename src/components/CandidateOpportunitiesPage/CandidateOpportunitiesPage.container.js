import {connect} from 'react-redux';
import CandidateOpportunitiesPage from './CandidateOpportunitiesPage';
import {
  getAllOpportunities,
  getAllSubmittedApplications,
} from 'state/opportunity';

const mapStateToProps = state => {
  const submittedIds = Object.values(state.applications)
    .filter(app => app.status !== 'draft')
    .map(app => app.opportunity.id);

  const opportunities = Object.values(state.opportunities);

  return {
    opportunities,
    contact: state.accounts.contact,
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
