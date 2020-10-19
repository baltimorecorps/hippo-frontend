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
import {mockContacts} from './mockContacts';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Contacts = ({classes, contacts, getAllContacts, deleteContact}) => {
  // const contacts = mockContacts;

  useEffect(() => {
    if (!contacts) getAllContacts();
  }, [getAllContacts, contacts]);

  const [searchBy, setSearchBy] = useState('name');
  const [filteredContacts, setFilteredContacts] = useState();
  const [searchedContacts, setSearchedContacts] = useState(contacts || '');
  const [searchValue, setSearchValue] = useState(null);
  const searchBarPlaceholder = `Search by ${searchBy}`;
  const [showStatus, setShowStatus] = useState(0);
  const [totalContacts, setTotalContacts] = useState();

  const handleFilterByStatus = (event, newValue) => {
    setShowStatus(newValue);
  };

  useEffect(() => {
    setFilteredContacts(searchedContacts);
  }, [searchedContacts]);

  useEffect(() => {
    setSearchedContacts(contacts);
  }, [contacts]);

  useEffect(() => {
    if (filteredContacts) setTotalContacts(filteredContacts.length);
  }, [filteredContacts]);

  useEffect(() => {
    setSearchValue('');
  }, [searchBy]);

  const handleChangeSearchBy = event => {
    event.persist();
    setSearchBy(event.target.value);
  };

  const handleChangeSearch = event => {
    event.persist();
    setSearchValue(event.target.value.toLowerCase());
  };

  useEffect(() => {
    switch (showStatus) {
      case 1:
        const createdContacts = searchedContacts.filter(
          contact => contact.status === 'created'
        );
        setFilteredContacts(createdContacts);
        break;
      case 2:
        const submittedContacts = searchedContacts.filter(
          contact => contact.status === 'submitted'
        );
        setFilteredContacts(submittedContacts);
        break;
      case 3:
        const approvedContacts = searchedContacts.filter(
          contact => contact.status === 'approved'
        );
        setFilteredContacts(approvedContacts);
        break;

      default:
        setFilteredContacts(searchedContacts);
        break;
    }
  }, [showStatus, searchedContacts]);

  if (filteredContacts == null) return <div>Loading...</div>;

  const handleClickOrEnterSearch = () => {
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
          setSearchedContacts(searchContacts);
          setShowStatus(0);

          break;
        case 'email':
          searchContacts = contacts.filter(contact => {
            const contactEmail = contact.email.toLowerCase();
            return contactEmail.includes(searchValue);
          });
          setSearchedContacts(searchContacts);
          setShowStatus(0);

          break;
        case 'id':
          searchContacts = contacts.filter(contact => {
            const contactId = String(contact.id);
            return contactId.includes(searchValue);
          });
          setSearchedContacts(searchContacts);
          setShowStatus(0);

          break;
        default:
          break;
      }
    }
  };

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
                id="search_by"
                value={searchBy}
                onChange={handleChangeSearchBy}
                className={classes.searchBySelector}
                inputProps={{
                  'data-testid': 'search_by_selector',
                }}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="id">id</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.searchBarContainer}>
            <TextField
              // data-testid="search_bar"
              id="search_contacts"
              className={classes.searchBar}
              placeholder={searchBarPlaceholder}
              name="search_contacts"
              value={searchValue || ''}
              onChange={handleChangeSearch}
              onKeyPress={e => {
                if (e.key === 'Enter') handleClickOrEnterSearch();
              }}
              variant="outlined"
              inputProps={{
                'data-testid': 'search_bar',
                classes: {
                  input: classes.resize,
                },
              }}
            />
            <Button
              data-testid="search_button"
              variant="contained"
              color="primary"
              className={classes.searchButton}
              onClick={() => handleClickOrEnterSearch()}
            >
              <SearchIcon /> Search
            </Button>
          </div>
        </div>
        <Tabs
          data-testid="filter_by_status_tabs"
          style={{marginTop: '20px', backgroundColor: '#f5f9ff'}}
          value={showStatus}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleFilterByStatus}
          aria-label="Filter by contacts' status"
        >
          <Tab
            data-testid="filter_all_contacts_tab"
            style={{width: '25%'}}
            label="All"
          />
          <Tab
            data-testid="filter_created_contacts_tab"
            style={{width: '25%'}}
            label="Created"
          />
          <Tab
            data-testid="filter_submitted_contacts_tab"
            style={{width: '25%'}}
            label="Submitted"
          />
          <Tab
            data-testid="filter_approved_contacts_tab"
            style={{width: '25%'}}
            label="Approved"
          />
        </Tabs>

        <Typography
          data-testid="total_found"
          component="p"
          variant="body1"
          align="center"
          className={classes.contactsFound}
        >
          (Found {totalContacts} {totalContacts > 1 ? 'contacts' : 'contact'})
        </Typography>
        <ContactList
          setTotalContacts={setTotalContacts}
          contacts={filteredContacts}
          getAllContacts={getAllContacts}
          deleteContact={deleteContact}
          showStatus={showStatus}
          setShowStatus={setShowStatus}
        />
      </Paper>
    </main>
  );
};

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.array,
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
    alignItems: 'center',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      width: '85%',
    },
  },
  searchBySelector: {
    width: '70px',
  },
  searchByContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '20%',
  },
  searchBarContainer: {
    width: '80%',
    display: 'flex',
    marginLeft: spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    width: '70%',
  },
  resize: {
    padding: '9px',
  },
  contactsFound: {
    marginTop: '20px',
    marginBottom: '10px',
    color: '#878787',
    fontSize: '14px',
  },
  searchButton: {
    marginLeft: '10px',
    height: '100%',
  },
});

export default withStyles(styles)(Contacts);
