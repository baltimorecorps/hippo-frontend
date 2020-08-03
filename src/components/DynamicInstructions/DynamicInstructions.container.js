import {connect} from 'react-redux';
import {getDynamicInstructions} from 'state/contacts';
import DynamicInstructions from './DynamicInstructions';

export const mapStateToProps = state => {
  let contact = Object.values(state.contacts)[0];
  const {id, instructions} = contact;
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
