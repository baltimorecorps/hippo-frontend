import { connect } from 'react-redux';
import Contacts from './Contacts';
import { addContact, refreshContacts } from '../../actions/contacts';

const addNewContact = (dispatch) =>
  async function(contact) {
    await addContact(contact)(dispatch);
    await refreshContacts(dispatch);
  };

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

const mapDispatchToProps = (dispatch) => ({
  addNewContact: addNewContact(dispatch),
  refreshContacts: () => refreshContacts(dispatch),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);

export default Container;
