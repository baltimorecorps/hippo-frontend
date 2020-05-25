import {connect} from 'react-redux';
import AddOrEditOpportunitiesPage from './AddOrEditOpportunitiesPage';
import {
  getAllOpportunities,
  addOpportunity,
  updateOpportunity,
  internalDeactivateRole,
  internalActivateRole,
} from 'state/opportunity';

const mapStateToProps = state => {
  const opportunities = Object.values(state.opportunities);
  const fellowshipOpps = opportunities.filter(
    opp => opp.program_name === 'Fellowship'
  );
  const mayoralOpps = opportunities.filter(
    opp => opp.program_name === 'Mayoral Fellowship'
  );
  const placeForPurposeOpps = opportunities.filter(
    opp => opp.program_name === 'Place for Purpose'
  );
  return {opportunities, fellowshipOpps, mayoralOpps, placeForPurposeOpps};
};

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
  addOpportunity: opportunity => addOpportunity(opportunity)(dispatch),
  updateOpportunity: (opportunity, opportunityId) =>
    updateOpportunity(opportunity, opportunityId)(dispatch),
  deactivateRole: opportunityId =>
    internalDeactivateRole(opportunityId)(dispatch),
  activateRole: opportunityId => internalActivateRole(opportunityId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditOpportunitiesPage);
