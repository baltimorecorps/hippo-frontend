import {connect} from 'react-redux';
import InternalOpportunityBoard from './InternalOpportunityBoard';
import {getApplication, getAllOpportunities} from 'state/opportunity';

const mapStateToProps = state => {
  // console.log(applications);
  let contactId;
  if (state.accounts.contact) {
    contactId = state.accounts.contact.id;
  }
  // console.log(state.applications);
  //   const application = Object.values(state.applications)
  //     .filter(app => app.status === 'submitted')
  //     .map(app => app.opportunity.id);
  // console.log(state.opportunities);

  const opportunities = Object.values(state.opportunities);
  // console.log(opportunities);
  return {
    contactId,
    opportunities: opportunities,
    // opportunities: state.opportunities,
    // application: application,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),

  getApplication: contactId => getApplication(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalOpportunityBoard);
