import React from 'react';
import './ContactList.css';
import ContactCard2 from './ContactCard2';
import { Card } from 'semantic-ui-react';



const ContactListFromApi2 = (props) =>{
   const items = props.items.map((item)=>{
       return <ContactCard2 item={item} />      
    });
    
    return <div className="contact-list" style={{width: "800px"}}> 
    <Card.Group  itemsPerRow={5}> {items} </Card.Group> 
    </div>;
};

export default ContactListFromApi2;