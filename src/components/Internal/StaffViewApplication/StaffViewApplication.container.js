import {connect} from 'react-redux';
import StaffReviewApplication from './StaffViewApplication';
import {
  getAllSubmittedApplications,
  getAllOpportunities,
  getApplication,
  staffRecommendApplication,
  staffNotAFitApplication,
  staffReopenApplication,
} from 'state/opportunity';

import {useParams} from 'react-router-dom';

const mapStateToProps = (state, props) => {
  const {opportunityId, contactId} = props.match.params;

  const opportunities = Object.values(state.opportunities);

  const matchingApplications = Object.values(state.applications).filter(app => {
    if (app.contact && app.opportunity)
      return (
        app.contact.id === Number(contactId) &&
        app.opportunity.id === opportunityId
      );
  });

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
  staffRecommendApplication: (contactId, opportunityId) =>
    staffRecommendApplication(contactId, opportunityId)(dispatch),
  staffNotAFitApplication: (contactId, opportunityId) =>
    staffNotAFitApplication(contactId, opportunityId)(dispatch),
  staffReopenApplication: (contactId, opportunityId) =>
    staffReopenApplication(contactId, opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffReviewApplication);
