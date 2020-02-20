import {connect} from 'react-redux';
import OpportunitiesPage from './OpportunitiesPage';
import {
  getAllOpportunities,
  getAllSubmittedApplications,
} from 'state/opportunity';

const mapStateToProps = state => {
  let contactId;
  if (state.accounts.contact) {
    contactId = state.accounts.contact.id;
  }

  const submittedIds = Object.values(state.applications)
    .filter(app => app.status === 'submitted')
    .map(app => app.opportunity.id);

  return {
    opportunities: state.opportunities,
    contactId,
    submittedIds: submittedIds,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  getAllApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage);
