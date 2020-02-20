import {connect} from 'react-redux';
import StaffReviewApplication from './StaffReviewApplication';
import {
  getAllSubmittedApplications,
  getAllOpportunities,
  getApplication,
} from 'state/opportunity';

const mapStateToProps = state => {
  // console.log(applications);
  let contactId;
  if (state.accounts.contact) {
    contactId = state.accounts.contact.id;
  }
  //   console.log(state.applications);
  const application = Object.values(state.applications);
  // .filter(
  //   app => app.status === 'submitted'
  // );
  // .map(app => app.opportunity.id);
  // console.log(state.opportunities);

  const opportunities = Object.values(state.opportunities);
  // console.log(opportunities);
  return {
    contactId,
    opportunities,
    // applications,
    application: application[0],

    // application: application,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),

  getAllSubmittedApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
  getApplication: (contactId, opportunityId) =>
    getApplication(contactId, opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffReviewApplication);
