import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Contacts = ({classes, contacts, getAllContacts, deleteContact}) => {
  useEffect(() => {
    if (!contacts) getAllContacts();
  }, [getAllContacts, contacts]);

  const [searchBy, setSearchBy] = useState('name');
  const [showContacts, setShowContacts] = useState(contacts || null);
  const [searchValue, setSearchValue] = useState('');
  const searchBarPlaceholder = `Search by ${searchBy}`;

  useEffect(() => {
    setShowContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    setSearchValue('');
  }, [searchBy]);

  useEffect(() => {
    let searchContacts = [];
    if (searchValue != null && contacts && contacts.length > 0) {
      switch (searchBy) {
        case 'name':
          searchContacts = contacts.filter(contact => {
            const contactName = contact.first_name.toLowerCase();
            const contactLastName = contact.last_name.toLowerCase();
            const contactFullName = `${contactName} ${contactLastName}`;
            return contactFullName.includes(searchValue);
          });
          setShowContacts(searchContacts);
          break;
        case 'email':
          searchContacts = contacts.filter(contact => {
            const contactEmail = contact.email.toLowerCase();
            return contactEmail.includes(searchValue);
          });
          setShowContacts(searchContacts);
          break;
        case 'id':
          searchContacts = contacts.filter(contact => {
            const contactId = String(contact.id);
            return contactId.includes(searchValue);
          });
          setShowContacts(searchContacts);
          break;
        default:
          break;
      }
    }
  }, [searchValue, searchBy, contacts]);

  const handleChangeSearchBy = event => {
    event.persist();
    setSearchBy(event.target.value);
  };

  const handleChangeSearch = event => {
    event.persist();
    setSearchValue(event.target.value.toLowerCase());
  };

  if (!showContacts) return <div>Loading...</div>;
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
              value={searchValue}
              onChange={handleChangeSearch}
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
            getAllContacts={getAllContacts}
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
  getAllContacts: PropTypes.func.isRequired,
  addNewContact: PropTypes.func.isRequired,
};

const styles = ({breakpoints, spacing}) => ({
  layout: {
    marginLeft: spacing(2),
    marginRight: spacing(2),
    width: '100%',

    [breakpoints.up(750 + spacing(2 * 2))]: {
      width: 750,

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

    [breakpoints.up('sm')]: {
      width: '85%',
    },
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
    borderRadius: '40%',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: '40%',
  },
});

export default withStyles(styles)(Contacts);
