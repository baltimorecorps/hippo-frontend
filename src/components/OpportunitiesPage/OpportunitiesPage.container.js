import {connect} from 'react-redux';
import OpportunitiesPage from './OpportunitiesPage';
import {
  getAllOpportunities,
  getAllSubmittedApplications,
} from 'state/opportunity';

const mapStateToProps = state => {
  // let contactId;
  // // if (state.accounts.contact) {
  // contactId = state.accounts.contact.id;
  // // }

  const contact = Object.values(state.contacts);

  const submittedIds = Object.values(state.applications)
    .filter(app => app.status === 'submitted')
    .map(app => app.opportunity.id);

  const opportunities = Object.values(state.opportunities);

  return {
    opportunities,
    // contactId: contact[0].id,
    contact: contact[0],
    submittedIds: submittedIds,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  getAllApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunitiesPage);
