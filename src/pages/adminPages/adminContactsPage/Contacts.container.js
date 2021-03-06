import {connect} from 'react-redux';
import Contacts from './Contacts';
import {addContact, getAllContacts, deleteContact} from 'state/contacts/contacts.actions';

const addNewContact = dispatch =>
  async function(contact) {
    await addContact(contact)(dispatch);
    await getAllContacts(dispatch);
  };

const mapStateToProps = state => {
  const contacts = state.contacts.short || null;
  let sortedContacts = null;
  if (contacts) sortedContacts = contacts.sort((a, b) => a.id - b.id);
  return {
    contacts: sortedContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  addNewContact: addNewContact(dispatch),
  getAllContacts: () => getAllContacts(dispatch),
  deleteContact: contactId => deleteContact(contactId)(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Contacts);

export default Container;
