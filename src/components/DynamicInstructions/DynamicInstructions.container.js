import {connect} from 'react-redux';
import {getDynamicInstructions, submitProfileForReview} from 'state/contacts';
import DynamicInstructions from './DynamicInstructions';

export const mapStateToProps = state => {};

export const mapDispatchToProps = dispatch => ({
  getDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
  submitProfileForReview: contactId =>
    submitProfileForReview(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicInstructions);
