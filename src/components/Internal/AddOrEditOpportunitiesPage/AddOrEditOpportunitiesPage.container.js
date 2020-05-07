import {connect} from 'react-redux';
import AddOrEditOpportunitiesPage from './AddOrEditOpportunitiesPage';
import {
  getAllOpportunities,
  addOpportunity,
  updateOpportunity,
} from 'state/opportunity';

const mapStateToProps = state => {
  const opportunities = Object.values(state.opportunities);
  return {opportunities};
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  addOpportunity: opportunity => addOpportunity(opportunity)(dispatch),
  updateOpportunity: (opportunity, opportunityId) =>
    updateOpportunity(opportunity, opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditOpportunitiesPage);
