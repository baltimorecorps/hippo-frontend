import {connect} from 'react-redux';
import InternalOpportunitiesPage from './InternalOpportunitiesPage';
import {
  getAllOpportunities,
  addOpportunity,
  updateOpportunity,
} from 'state/opportunity';

const mapStateToProps = state => ({
  opportunities: state.opportunities,
});

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  addOpportunity: opportunity => addOpportunity(opportunity)(dispatch),
  updateOpportunity: (opportunity, opportunityId) =>
    updateOpportunity(opportunity, opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalOpportunitiesPage);
