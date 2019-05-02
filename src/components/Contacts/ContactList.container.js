import React from 'react';
import ContactList from './ContactList';

const CONTACTS_DATA = [
    {
      id: 1,
      email_primary: {
        id: 1,
        is_primary: true,
        type: "Work"
      },
      last_name: "wu",
      first_name: "yifei"
    },
    {
      id: 2,
      email_primary: null,
      last_name: "Johnson",
      first_name: "Aisha"
    },
    {
      id: 3,
      email_primary: null,
      last_name: "Doe",
      first_name: "John"
    },
    {
      id: 4,
      email_primary: null,
      last_name: "Doe",
      first_name: "Jane"
    }
  ];

const Container = () => {
  return (
    <ContactList
      contacts={CONTACTS_DATA}
    />
  );
};

export default Container;
