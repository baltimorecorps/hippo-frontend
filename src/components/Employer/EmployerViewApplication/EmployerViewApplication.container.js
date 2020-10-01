import {connect} from 'react-redux';
import EmployerViewApplication from './EmployerViewApplication';
import {
  getAllSubmittedApplications,
  getAllOpportunities,
  getApplication,
  employerInterviewApplication,
  employerNotAFitApplication,
  employerFinalistsApplication,
} from 'state/opportunity';

const mapStateToProps = (state, props) => {
  let {opportunityId, contactId} = props.match.params;
  contactId = parseInt(contactId);
  const opportunities = Object.values(state.opportunities);

  const matchingApplications = Object.values(state.applications).filter(
    app => app.contact.id === contactId && app.opportunity.id === opportunityId
  );

  return {
    contactId,
    opportunityId,
    opportunities,
    application: matchingApplications[0],
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  getAllSubmittedApplications: contactId =>
    getAllSubmittedApplications(contactId)(dispatch),
  getApplication: (contactId, opportunityId) =>
    getApplication(contactId, opportunityId)(dispatch),
  employerInterviewApplication: (contactId, opportunityId, interviewDateTime) =>
    employerInterviewApplication(
      contactId,
      opportunityId,
      interviewDateTime
    )(dispatch),
  employerNotAFitApplication: (contactId, opportunityId) =>
    employerNotAFitApplication(contactId, opportunityId)(dispatch),
  employerFinalistsApplication: (contactId, opportunityId) =>
    employerFinalistsApplication(contactId, opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployerViewApplication);
