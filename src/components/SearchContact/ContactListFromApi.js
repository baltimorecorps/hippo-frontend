import React from 'react';
import './ContactList.css';
import ContactCard from './ContactCard';

const ContactListFromApi = (props) => {
  const images = props.images.map((image) => {
    return <ContactCard key={image.id} image={image} />;
  });

  return <div className="contact-list"> {images} </div>;
};

export default ContactListFromApi;
