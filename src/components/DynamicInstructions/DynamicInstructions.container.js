import {connect} from 'react-redux';
import {getDynamicInstructions} from 'state/contacts';
import DynamicInstructions from './DynamicInstructions';
import get from 'lodash.get';

export const mapStateToProps = state => {
  const contact = Object.values(state.contacts)[0];
  const id = get(contact, 'id', 0);
  const instructions = get(contact, 'instructions', {});

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
