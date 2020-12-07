import {connect} from 'react-redux';
import {getDynamicInstructions, submitProfileForReview} from 'state/contacts/contacts.actions';
import DynamicInstructions from './DynamicInstructions';

export const mapDispatchToProps = dispatch => ({
  getDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
  submitProfileForReview: contactId =>
    submitProfileForReview(contactId)(dispatch),
});

export default connect(null, mapDispatchToProps)(DynamicInstructions);
