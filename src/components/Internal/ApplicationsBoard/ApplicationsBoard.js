import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory, useRouteMatch} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Link from '@material-ui/core/Link';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const ApplicationsBoard = ({
  classes,
  approveNewApplicants,
  allApplicants,
  getAllContactsPrograms,
  approvedApplicants,
}) => {
  useEffect(() => {
    if (approvedApplicants && approvedApplicants.length === 0)
      getAllContactsPrograms();
  }, [getAllContactsPrograms, approvedApplicants]);

  const match = useRouteMatch();

  const [showForm, setShowForm] = useState(false);

  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [allPosts, setAllPosts] = useState(approvedApplicants);

  let history = useHistory();

  const toProfile = contactId => {
    history.push(`/profile/${contactId}`);
  };

  let options = {};
  if (allApplicants) {
    options = allApplicants.map(contact => {
      return {
        name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
        contact_id: contact.id,
        contact: contact,
      };
    });
  }

  const onClickView = contactId => {
    history.push(`${match.url}/${contactId}`);
  };

  let sortApplicants = [];

  if (approvedApplicants) {
    sortApplicants = approvedApplicants.sort((a, b) =>
      a.first_name < b.first_name ? -1 : a.first_name < b.first_name ? 1 : 0
    );
  }

  useEffect(() => {
    setAllPosts(sortApplicants);
  }, [setAllPosts, sortApplicants]);

  const handleChangePostsPerPage = event => {
    event.persist();

    setPostsPerPage(event.target.value);
  };
  const handleChangeSearch = event => {
    event.persist();

    const name = event.target.value.toLowerCase();
    if (name != null) {
      const searchNames = approvedApplicants.filter(applicant => {
        const applicantName = applicant.first_name.toLowerCase();
        const applicantLastName = applicant.last_name.toLowerCase();
        const applicantFullName = `${applicantName} ${applicantLastName}`;
        const applicantEmail = applicant.email.toLowerCase();
        return (
          applicantFullName.includes(name) || applicantEmail.includes(name)
        );
      });
      setCurrentPage(1);
      setAllPosts(searchNames);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    allPosts && allPosts.length > 2
      ? allPosts.slice(indexOfFirstPost, indexOfLastPost)
      : allPosts;

  const pageCount = Math.ceil(allPosts.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 0; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const paginate = event => {
    event.persist();
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  if (!approvedApplicants) {
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

      {showForm ? (
        <ApproveNewApplicantForm
          options={options}
          approveNewApplicants={approveNewApplicants}
          closeForm={() => setShowForm(false)}
        />
      ) : (
        <Grid className={`${classes.buttonContainer} `}>
          <Button
            onClick={() => setShowForm(true)}
            variant="contained"
            color="primary"
            className={classes.approveButton}
          >
            + Approve New Applicant
          </Button>
          <div className={classes.searchFilterContainer}>
            <div>
              <TextField
                id="search-applicants"
                className={classes.searchBar}
                placeholder="Search by name or email"
                name="search-applicants"
                onChange={handleChangeSearch}
                InputProps={{
                  classes: {
                    input: classes.resize,
                  },
                }}
              />
            </div>
            <div>
              <FormControl className={classes.formControlSelector}>
                <InputLabel className={classes.postsPerPageLabel}>
                  Applicants/Page
                </InputLabel>
                <Select
                  id="post-per-page"
                  value={postsPerPage}
                  onChange={handleChangePostsPerPage}
                  className={classes.postsPerPageSelector}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </Grid>
      )}

      {currentPosts &&
        currentPosts.map((applicant, index) => (
          <Paper
            className={`${classes.paper} ${classes.applicantsPaper}`}
            key={index}
          >
            <div className={classes.profileIconContainer}>
              <Link
                onClick={() => toProfile(applicant.id)}
                className={classes.link}
              >
                <AccountBoxIcon className={classes.profileIcon} />
              </Link>
            </div>
            <Link
              onClick={() => onClickView(applicant.id)}
              className={classes.viewApplicantLink}
            >
              <Typography
                component="p"
                variant="body1"
                className={classes.name}
              >
                {applicant.first_name} {applicant.last_name}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                className={classes.email}
              >
                ({applicant.email})
              </Typography>
            </Link>
            <div className={classes.programTagsContainer}>
              {applicant.programs.map(
                (program, index) =>
                  program.is_approved && (
                    <div className={classes.programTags} key={index}>
                      {program.program.name}
                    </div>
                  )
              )}
            </div>
          </Paper>
        ))}

      {!showCard && (
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
      )}
    </div>
  );
};

ApplicationsBoard.propTypes = {
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
  // applicants: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     is_active: PropTypes.bool.Required,
  //     applications: PropTypes.array,
  //     contact: PropTypes.object.isRequired,
  //     id: PropTypes.number.Required,
  //     program_id: PropTypes.number.Required,
  //     is_approved: PropTypes.bool.Required,
  //   })
  // ).isRequired,
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
  searchFilterContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '10px',
    justifyContent: 'space-between',
    padding: 0,

    width: '100%',
    [breakpoints.up('lg')]: {
      alignItems: 'center',
      marginLeft: spacing(4),

      justifyContent: 'space-between',
    },
  },
  formControlSelector: {
    minWidth: 103,
    backgroundColor: '#ffffff',
    padding: '5px 10px',
    border: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postsPerPageLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  postsPerPageSelector: {
    width: '90%',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: '5px 20px',
    width: 300,
    borderRadius: '20px',
    [breakpoints.up('md')]: {
      width: 350,
    },
    [breakpoints.up('lg')]: {
      width: 500,
    },
    // border: '1px solid grey',
  },
  resize: {
    fontSize: 19,
  },
  postsPerPageLabel: {
    padding: '5px 10px',
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
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('lg')]: {
      flexDirection: 'row',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',

    marginBottom: spacing(0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  approveButton: {
    [breakpoints.up('lg')]: {
      height: '55px',
      width: '300px',
    },
    height: '40px',
  },

  pagination: {
    margin: spacing(2),
  },
});

export default withStyles(styles)(ApplicationsBoard);
