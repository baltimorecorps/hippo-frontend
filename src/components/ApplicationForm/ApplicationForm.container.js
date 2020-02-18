import {connect} from 'react-redux';
import ApplicationForm from './ApplicationForm';
import {
  startApplication,
  getApplication,
  updateApplication,
  submitApplication,
} from '../../state/opportunity';
import {getAllOpportunities} from '../../state/opportunity';
import {useParams} from 'react-router-dom';

const mapStateToProps = (state, props) => {
  const {opportunityId} = props.match.params;

  const contactId = state.accounts.contact ? state.accounts.contact.id : null;
  const matchingApplications = Object.values(state.applications).filter(
    app => app.contact.id === contactId && app.opportunity.id === opportunityId
  );
  const application = matchingApplications[0] || null;

  return {
    contact: state.accounts.contact,
    opportunity: state.opportunities[opportunityId],
    application,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  startApplication: (contactId, opportunityId) =>
    startApplication(contactId, opportunityId)(dispatch),
  getApplication: (contactId, opportunityId) =>
    getApplication(contactId, opportunityId)(dispatch),
  updateApplication: application => updateApplication(application)(dispatch),
  submitApplication: application => submitApplication(application)(dispatch),
  getAllOpportunities: () => getAllOpportunities(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm);
