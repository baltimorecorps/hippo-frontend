import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList';
// import AddContact from './AddContact';

import TextField from '@material-ui/core/TextField';

const Contacts = ({classes, contacts, getAllContactsShort, deleteContact}) => {
  const [searchBy, setSearchBy] = useState('name');
  const [showContacts, setShowContacts] = useState(contacts || null);

  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);

  useEffect(() => {
    setShowContacts(contacts);
  }, [contacts]);

  const handleChangeSearch = event => {
    event.persist();
    const name = event.target.value.toLowerCase();

    if (name != null) {
      const searchContacts = contacts.filter(contact => {
        const contactName = contact.first_name.toLowerCase();
        const contactLastName = contact.last_name.toLowerCase();
        const contactFullName = `${contactName} ${contactLastName}`;
        const contactEmail = contact.email.toLowerCase();
        return contactFullName.includes(name) || contactEmail.includes(name);
      });
      // setCurrentPage(1);
      console.log('searchContacts', searchContacts);
      setShowContacts(searchContacts);
    }
  };

  // console.log('showContacts', showContacts);
  // console.log('contacts', contacts);

  if (!showContacts || showContacts.length === 0) return <div>Loading...</div>;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Profiles
        </Typography>
        <div>
          <TextField
            id="search-contacts"
            className={classes.searchBar}
            placeholder="Search by name, email, or id"
            name="search-contacts"
            onChange={handleChangeSearch}
            InputProps={{
              classes: {
                input: classes.resize,
              },
            }}
          />
        </div>
        <React.Fragment>
          <ContactList
            contacts={showContacts}
            getAllContactsShort={getAllContactsShort}
            deleteContact={deleteContact}
          />
          {/* <AddContact addNewContact={props.addNewContact} dialog /> */}
        </React.Fragment>
      </Paper>
    </main>
  );
};

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  getAllContactsShort: PropTypes.func.isRequired,
  addNewContact: PropTypes.func.isRequired,
};

const styles = ({breakpoints, spacing}) => ({
  layout: {
    width: 'auto',
    marginLeft: spacing(2),
    marginRight: spacing(2),
    [breakpoints.up(600 + spacing(2 * 2))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
    padding: spacing(2),
    [breakpoints.up(600 + spacing(3 * 2))]: {
      marginTop: spacing(6),
      marginBottom: spacing(6),
      padding: spacing(3),
    },
  },
  button: {
    marginTop: spacing(3),
    marginLeft: spacing(1),
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: '5px 20px',
    width: '100%',
    borderRadius: '20px',
    // [breakpoints.up('md')]: {
    //   width: 350,
    // },
    // [breakpoints.up('lg')]: {
    //   width: 500,
    // },
    // border: '1px solid grey',
  },
});

export default withStyles(styles)(Contacts);
