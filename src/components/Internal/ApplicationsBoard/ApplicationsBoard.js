import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';
import ApplicationCards from './ApplicationCards';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Link from '@material-ui/core/Link';
import Pagination from '@material-ui/lab/Pagination';

const MainPage = ({
  classes,
  approveNewApplicants,
  contacts,
  applicants,
  getAllContactsShort,
  getAllInternalApplicants,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [contactId, setContactId] = useState();
  const [applicant, setApplicant] = useState();
  const [applications, setApplications] = useState();
  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);
  useEffect(() => {
    getAllInternalApplicants();
  }, [getAllInternalApplicants]);

  let history = useHistory();

  const toProfile = contactId => {
    history.push(`/profile/${contactId}`);
  };

  let options = {};
  options = contacts.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      contact_id: contact.id,
      contact: contact,
    };
  });

  const candidates = [
    {
      first_name: 'Bay',
      last_name: 'Chairangsaris',
      email: 'bay@baltimorecorps.org',
      programs: ['Place for Purpose', 'Fellowship', 'Mayoral Fellowship'],
    },
    {
      first_name: 'Billy',
      last_name: 'Daly',
      email: 'billy@baltimorecorps.org',
      programs: ['Mayoral Fellowship'],
    },
    {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@baltimorecorps.org',
      programs: ['Place for Purpose', 'Mayoral Fellowship'],
    },
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@baltimorecorps.org',
      programs: ['Fellowship'],
    },
  ];

  const onClickView = (contactId, applicant) => {
    setContactId(contactId);
    setApplicant(applicant);
    setApplications(applicant.applications);
    setShowCard(true);
  };

  // TODO
  // Sorting Applicants
  // Search applicants by name or email

  const sortApplicants = applicants.sort((a, b) =>
    a.contact.first_name < b.contact.first_name
      ? -1
      : a.contact.first_name < b.contact.first_name
      ? 1
      : 0
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortApplicants.slice(indexOfFirstPost, indexOfLastPost);
  const pageCount = Math.ceil(applicants.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 0; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const paginate = event => {
    event.persist();
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  if (!applicants) {
    return <div>...Loading</div>;
  }
  return (
    <div className={classes.container}>
      <PartnershipsNavBar />
      <Paper className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          className={classes.header}
        >
          Internal Applications Board
        </Typography>
      </Paper>
      {showCard ? (
        <Grid className={classes.buttonContainer}>
          <Button
            onClick={() => setShowCard(false)}
            variant="contained"
            color="primary"
            className={classes.createButton}
          >
            Back
          </Button>
        </Grid>
      ) : showForm ? (
        <ApproveNewApplicantForm
          options={options}
          approveNewApplicants={approveNewApplicants}
          closeForm={() => setShowForm(false)}
        />
      ) : (
        <Grid className={classes.buttonContainer}>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
            className={classes.createButton}
          >
            Approve New Applicant
          </Button>
        </Grid>
      )}

      {showCard ? (
        <ApplicationCards
          contactId={contactId}
          applicant={applicant}
          applications={applications}
          page="internal"
        />
      ) : (
        currentPosts.map((applicant, index) => (
          <Paper
            className={`${classes.paper} ${classes.applicantsPaper}`}
            key={index}
          >
            <div className={classes.profileIconContainer}>
              <Link
                onClick={() => toProfile(applicant.contact.id)}
                className={classes.link}
              >
                <AccountBoxIcon className={classes.profileIcon} />
              </Link>
            </div>
            <Link
              onClick={() => onClickView(applicant.contact.id, applicant)}
              className={classes.viewApplicantLink}
            >
              <Typography
                component="p"
                variant="body1"
                className={classes.name}
              >
                {applicant.contact.first_name} {applicant.contact.last_name}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                className={classes.email}
              >
                ({applicant.contact.email})
              </Typography>
            </Link>
            <div className={classes.programTagsContainer}>
              {candidates[0].programs.map((program, index) => (
                <div className={classes.programTags} key={index}>
                  {program}
                </div>
              ))}
            </div>
          </Paper>
        ))
      )}
      <Pagination
        defaultPage={1}
        page={currentPage}
        count={pageCount}
        onClick={e => paginate(e)}
        color="primary"
        className={classes.pagination}
        hideNextButton
        hidePrevButton
      />
    </div>
  );
};

MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllContactsShort: PropTypes.func.isRequired,
  approveNewApplicants: PropTypes.func.isRequired,
  getAllInternalApplicants: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      first_name: PropTypes.string,
      id: PropTypes.number,
      last_name: PropTypes.string,
    })
  ).isRequired,
  applicants: PropTypes.arrayOf(
    PropTypes.shape({
      is_active: PropTypes.bool.Required,
      applications: PropTypes.array,
      contact: PropTypes.object.isRequired,
      id: PropTypes.number.Required,
      program_id: PropTypes.number.Required,
      is_approved: PropTypes.bool.Required,
    })
  ).isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
  },
  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
  },
  applicantsPaper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  profileIconContainer: {
    width: 'auto',
  },
  profileIcon: {
    fontSize: '60px',
    color: palette.primary.link,
    cursor: 'pointer',
    [breakpoints.up('sm')]: {
      marginRight: '10px',
    },
  },

  viewApplicantLink: {
    color: '#000000',
    width: '65%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px 0px',
    borderRadius: '5px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      textDecoration: 'none',
    },

    [breakpoints.up('sm')]: {
      marginRight: '20px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 0,
      padding: '10px 20px',
    },
  },
  name: {
    fontSize: '22px',
  },
  email: {
    color: 'grey',
  },
  programTagsContainer: {
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.up('sm')]: {
      justifySelf: 'flex-end',
      marginLeft: 'auto',
    },
  },
  programTags: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid grey',
    padding: '3px 8px',
    margin: '3px 3px',
    borderRadius: '5px',
    fontSize: '15px',
    minWidth: '150px',
    [breakpoints.up('sm')]: {
      marginRight: '10px',
    },
  },
  buttonContainer: {
    marginBottom: spacing(2),
  },
  pagination: {
    margin: spacing(2),
  },
});

export default withStyles(styles)(MainPage);
