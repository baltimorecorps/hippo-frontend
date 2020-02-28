import {connect} from 'react-redux';
import InternalOpportunityBoard from './InternalOpportunityBoard';
import {getAllInternalOpportunities} from 'state/opportunity';

const mapStateToProps = state => {
  const opportunities = Object.values(state.opportunities);

  return {
    opportunities,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllInternalOpportunities: () => getAllInternalOpportunities(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalOpportunityBoard);
