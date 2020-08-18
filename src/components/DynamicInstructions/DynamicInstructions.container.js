import {connect} from 'react-redux';
import {getDynamicInstructions, submitProfileForReview} from 'state/contacts';
import DynamicInstructions from './DynamicInstructions';
import {blankInstructions} from './defaultValues';

import get from 'lodash.get';

export const mapStateToProps = state => {
  const contact = Object.values(state.contacts)[0];

  const id = get(contact, 'id', null);
  const instructions = get(contact, 'instructions', blankInstructions);
  const status = get(contact, 'status', 'created');
  return {
    id,
    instructions,
    status,
  };
};

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
