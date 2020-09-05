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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import FilterApplicantsForm from './FilterApplicantsForm';

const ApplicantsOverview = ({
  classes,
  getSubmittedContacts,
  approveNewContactsStatus,
  submittedApplicants,
  addContactsFilters,
  filteredContacts,
}) => {
  useEffect(() => {
    if (!filteredContacts || filteredContacts.length === 0)
      addContactsFilters({});
  }, [addContactsFilters, filteredContacts]);

  const [showApproveForm, setShowApproveForm] = useState(false);
  const [presentApplicants, setPresentApplicants] = useState(filteredContacts);
  const [openFilterForm, setOpenFilterForm] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    setPresentApplicants(filteredContacts);
  }, [filteredContacts]);

  if (!presentApplicants) {
    return <div>...Loading</div>;
  }
  return (
    <div className={classes.container}>
      <PartnershipsNavBar />

      <ApplicantsTable
        presentApplicants={presentApplicants}
        handleClickOpenFilterForm={() => setOpenFilterForm(true)}
        filterCount={filterCount}
        setShowApproveForm={setShowApproveForm}
        showApproveForm={showApproveForm}
        filteredContacts={filteredContacts}
        setPresentApplicants={setPresentApplicants}
        getSubmittedContacts={getSubmittedContacts}
        approveNewContactsStatus={approveNewContactsStatus}
        submittedApplicants={submittedApplicants}
      />
      {openFilterForm && (
        <FilterApplicantsForm
          isOpen={openFilterForm}
          handleClose={() => setOpenFilterForm(false)}
          addContactsFilters={addContactsFilters}
          setFilterCount={setFilterCount}
          filterCount={filterCount}
        />
      )}
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
