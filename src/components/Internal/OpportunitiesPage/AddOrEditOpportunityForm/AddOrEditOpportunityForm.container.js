import {connect} from 'react-redux';
import AddOrEditOpportunityForm from './AddOrEditOpportunityForm';
import {addOpportunity, updateOpportunity} from 'state/opportunity';

const mapDispatchToProps = dispatch => ({
  addOpportunity: opportunity => addOpportunity(opportunity)(dispatch),
  updateOpportunity: (opportunity, opportunityId) =>
    updateOpportunity(opportunity, opportunityId)(dispatch),
});

export default connect(null, mapDispatchToProps)(AddOrEditOpportunityForm);
