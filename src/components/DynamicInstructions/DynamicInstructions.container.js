import {connect} from 'react-redux';
import {getDynamicInstructions} from 'state/contacts';
import DynamicInstructions from './DynamicInstructions';
import get from 'lodash.get';

export const mapStateToProps = state => {
  const contact = Object.values(state.contacts)[0];

  const id = get(contact, 'id', false);
  const instructions = get(contact, 'instructions', false);

  return {
    id,
    instructions,
  };
};

export const mapDispatchToProps = dispatch => ({
  getDynamicInstructions: contactId =>
    getDynamicInstructions(contactId)(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicInstructions);
