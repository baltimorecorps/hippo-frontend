import {connect} from 'react-redux';
import Contacts from './Contacts';
import {addContact, getAllContactsShort, deleteContact} from 'state/contacts';

const addNewContact = dispatch =>
  async function(contact) {
    await addContact(contact)(dispatch);
    await getAllContactsShort(dispatch);
  };

const mapStateToProps = state => {
  const contacts = state.contacts.short || null;
  let sortedContacts = [];

  if (contacts) sortedContacts = contacts.sort((a, b) => a.id - b.id);
  return {
    contacts: sortedContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  addNewContact: addNewContact(dispatch),
  getAllContactsShort: () => getAllContactsShort(dispatch),
  deleteContact: contactId => deleteContact(contactId)(dispatch),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Contacts);

export default Container;
