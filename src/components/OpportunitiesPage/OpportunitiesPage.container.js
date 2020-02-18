import {connect} from 'react-redux';
import OpportunitiesPage from './OpportunitiesPage';
import {getAllOpportunities} from 'state/opportunity';

const mapStateToProps = state => ({
  opportunities: state.opportunities,
});

const mapDispatchToProps = dispatch => ({
  getAllOpportunities: () => getAllOpportunities(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunitiesPage);
