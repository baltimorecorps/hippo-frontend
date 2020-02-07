import {connect} from 'react-redux';
import OpportunityForm from './OpportunityForm';
import {addOpportunity} from '../../state/opportunity';

const mapDispatchToProps = dispatch => ({
  addOpportunity: (opportunity) => addOpportunity(opportunity)(dispatch),
});

const mapStateToProps = state => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpportunityForm);
