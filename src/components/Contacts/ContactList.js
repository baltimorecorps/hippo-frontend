import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ContactList = ({contacts}) => (
  <List>
    {contacts.map(c => (
      <ListItem key={c.id} 
        component={Link} to={`/Profile/${c.id}`} 
        divider >
        <ListItemText primary={`${c.first_name} ${c.last_name}`} />
      </ListItem>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList
