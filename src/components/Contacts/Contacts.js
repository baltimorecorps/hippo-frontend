import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ContactList from './ContactList';
// import AddContact from './AddContact';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Contacts = ({classes, contacts, getAllContactsShort, deleteContact}) => {
  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);

  const [searchBy, setSearchBy] = useState('name');
  const [showContacts, setShowContacts] = useState(contacts || null);
  const [searchBarPlaceholder, setSearchBarPlaceholder] = useState(
    'Search by name'
  );

  useEffect(() => {
    setShowContacts(contacts);
  }, [contacts]);

  const handleChangeSearchBy = event => {
    event.persist();

    setSearchBy(event.target.value);

    switch (event.target.value) {
      case 'email':
        setSearchBarPlaceholder('Search by email');
        break;
      case 'id':
        setSearchBarPlaceholder('Search by id');
        break;
      default:
        setSearchBarPlaceholder('Search by name');
        break;
    }
  };

  const handleChangeSearch = (event, searchContactsBy) => {
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
      console.log('searchContacts', searchContacts);
      setShowContacts(searchContacts);
    }
  };

  if (!showContacts || showContacts.length === 0) return <div>Loading...</div>;
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Profiles
        </Typography>
        <div className={classes.searchFilterContainer}>
          <div className={classes.searchByContainer}>
            <FormControl className={classes.formControlSelector}>
              <InputLabel className={classes.postsPerPageLabel}>
                Search by
              </InputLabel>
              <Select
                id="search-by"
                value={searchBy}
                onChange={handleChangeSearchBy}
                className={classes.searchBySelector}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="id">id</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.searchBarContainer}>
            <TextField
              id="search-contacts"
              className={classes.searchBar}
              placeholder={searchBarPlaceholder}
              name="search-contacts"
              onChange={e => handleChangeSearch(e, searchBy)}
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
            />
          </div>
        </div>
        <React.Fragment>
          <ContactList
            contacts={showContacts}
            getAllContactsShort={getAllContactsShort}
            deleteContact={deleteContact}
          />
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

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
  searchFilterContainer: {
    display: 'flex',
    marginTop: '10px',
    padding: 0,

    width: '85%',
    [breakpoints.up('lg')]: {},
  },
  searchBySelector: {
    width: '70px',
  },
  searchByContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  searchBarContainer: {
    width: '100%',
    display: 'flex',
    marginLeft: spacing(1.5),
    alignItems: 'flex-end',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    // padding: '0px 20px',
    width: '100%',
    borderRadius: '40px',
  },
});

export default withStyles(styles)(Contacts);
