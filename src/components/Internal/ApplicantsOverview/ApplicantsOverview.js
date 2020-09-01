import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';
import PartnershipsNavBar from '../PartnershipsPage/PartnershipsNavBar';
import TextField from '@material-ui/core/TextField';
import ApplicantsTable from './ApplicantsTable';
import {mockApplicants} from './mockData';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const ApplicantsOverview = ({
  classes,
  getSubmittedContacts,
  getApprovedContacts,
  approveNewContactsStatus,
  approvedApplicants,
  submittedApplicants,
}) => {
  useEffect(() => {
    if (!approvedApplicants || approvedApplicants.length === 0)
      getApprovedContacts();
  }, [getApprovedContacts, approvedApplicants]);

  const [showForm, setShowForm] = useState(false);
  const [allPosts, setAllPosts] = useState();

  // const sortApplicants = approvedApplicants.sort((a, b) =>
  //   a.first_name < b.first_name ? -1 : a.first_name < b.first_name ? 1 : 0
  // );
  const sortApplicants = mockApplicants;

  useEffect(() => {
    setAllPosts(sortApplicants);
  }, [sortApplicants]);

  const handleChangeSearch = event => {
    event.persist();
    const name = event.target.value.toLowerCase();
    if (name != null) {
      const searchNames = mockApplicants.filter(applicant => {
        const applicantFullName = `${applicant.first_name} ${applicant.last_name}`.toLowerCase();
        const applicantEmail = applicant.email.toLowerCase();
        return (
          applicantFullName.includes(name) || applicantEmail.includes(name)
        );
      });
      setAllPosts(searchNames);
    }
  };

  if (!allPosts) {
    return <div>...Loading</div>;
  }
  return (
    <div className={classes.container}>
      <PartnershipsNavBar />

      <React.Fragment>
        <Grid className={classes.buttonContainer}>
          {showForm ? (
            <ApproveNewApplicantForm
              submittedApplicants={submittedApplicants || []}
              getSubmittedContacts={getSubmittedContacts}
              approveNewContactsStatus={approveNewContactsStatus}
              closeForm={() => setShowForm(false)}
            />
          ) : (
            <div className={classes.searchFilterContainer}>
              <div>
                <TextField
                  id="search-applicants"
                  className={classes.searchBar}
                  placeholder="&#128269; Search by name or email"
                  name="search-applicants"
                  onChange={handleChangeSearch}
                  InputProps={{
                    classes: {
                      input: classes.resize,
                    },
                    disableUnderline: true,
                  }}
                />
              </div>

              <Button
                onClick={() => setShowForm(true)}
                variant="contained"
                color="primary"
                className={classes.approveButton}
              >
                <GroupAddIcon style={{marginRight: '5px'}} /> Approve Applicants
              </Button>
            </div>
          )}
        </Grid>
      </React.Fragment>

      <ApplicantsTable
        // approvedApplicants={approvedApplicants}
        mockApplicants={allPosts}
      />
    </div>
  );
};

ApplicantsOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  getSubmittedContacts: PropTypes.func.isRequired,
  getApprovedContacts: PropTypes.func.isRequired,
  approveNewContactsStatus: PropTypes.func.isRequired,
  approvedApplicants: PropTypes.array,
  submittedApplicants: PropTypes.array,
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
    marginTop: spacing(1),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [breakpoints.up('lg')]: {
      alignItems: 'center',
      marginLeft: spacing(4),
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
    padding: '5px 10px',
  },
  postsPerPageSelector: {
    width: '90%',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: '0px 10px',
    width: 310,
    borderRadius: '10px',
    marginBottom: '10px',
    [breakpoints.up('md')]: {
      width: 380,
      marginBottom: '0px',
    },
    [breakpoints.up('lg')]: {
      width: 500,
    },
  },
  resize: {
    fontSize: 16,
  },

  header: {
    [breakpoints.up('sm')]: {
      fontSize: '24px',
    },
    fontSize: '20px',
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
    height: '32px',
  },
  pagination: {
    margin: spacing(2),
  },
});

export default withStyles(styles)(ApplicantsOverview);
