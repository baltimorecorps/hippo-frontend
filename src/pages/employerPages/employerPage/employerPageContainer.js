//libraries
import {connect} from 'react-redux';

//files
import EmployerPage from './employerPage';
import {getOrgOpportunity} from 'state/opportunity';

const mapStateToProps = (state, props) => {
  const {opportunityId} = props.match.params;

  const opportunity = state.opportunities[opportunityId];

  return {
    opportunity,
  };
};

const mapDispatchToProps = dispatch => ({
  getOrgOpportunity: opportunityId =>
    getOrgOpportunity(opportunityId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerPage);
