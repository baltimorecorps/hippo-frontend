import React from 'react';
import './ContactList.css';
import ContactCard from './ContactCard';
import CardGroupProps from './CardGroupProps';


const ContactList = (props) =>{
   const images = props.images.map((image)=>{
       return <ContactCard key={image.id} image={image}/>
          
    });
    return <CardGroupProps />;
    //return <div className="contact-list"> {images} </div>;
};

export default ContactList;