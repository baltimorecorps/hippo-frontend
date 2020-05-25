import {connect} from 'react-redux';
import InternalOpportunityBoard from './opportunitiesBoard';
import {getAllInternalOpportunities} from 'state/opportunity';

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
  getAllInternalOpportunities: () => getAllInternalOpportunities(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalOpportunityBoard);
