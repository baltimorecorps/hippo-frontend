import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ApproveNewApplicantForm from './ApproveNewApplicantForm';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0,0.1)',

    margin: '20px',
  },
  iconButton: {
    backgroundColor: theme.palette.primary.main,
    color: '#303030',
    boxShadow: '1px  1px 1px 1px rgba(0,0,0,0.3)',
    '&:hover': {
      backgroundColor: '#d4a92c',
    },
  },
  resize: {
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: '0px 10px',
    width: 310,
    borderRadius: '10px',
    marginBottom: '10px',
    [theme.breakpoints.up('md')]: {
      width: 380,
      marginBottom: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      width: 500,
    },
  },
  approveButton: {
    height: '32px',
    marginRight: '10px',
  },
  customBadge: {
    top: '5px',
    right: '5px',
    backgroundColor: '#2b6eff',
  },
}));

const TableToolbar = ({
  numSelected,
  print,
  handleClickOpenFilterForm,
  filterCount,
  setShowApproveForm,
  showApproveForm,
  filteredContacts,
  setPresentApplicants,
  getSubmittedContacts,
  getApprovedContacts,
  approveNewContactsStatus,
  submittedApplicants,
}) => {
  const classes = useToolbarStyles();
  // const {numSelected, print, handleClickOpenFilterForm, filterCount} = props;

  const handleChangeSearch = event => {
    event.persist();
    const name = event.target.value.toLowerCase();
    if (name != null) {
      const searchNames = filteredContacts.filter(applicant => {
        const applicantFullName = `${applicant.first_name} ${applicant.last_name}`.toLowerCase();
        const applicantEmail = applicant.email.toLowerCase();
        return (
          applicantFullName.includes(name) || applicantEmail.includes(name)
        );
      });
      setPresentApplicants(searchNames);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Tooltip
          title="Filter Candidates"
          style={{marginRight: '10px'}}
          placement="top"
        >
          <Badge
            badgeContent={filterCount}
            color="secondary"
            classes={{badge: classes.customBadge}}
          >
            <IconButton
              onClick={() => handleClickOpenFilterForm()}
              aria-label="filter candidates"
              className={classes.iconButton}
            >
              <FilterListIcon />
            </IconButton>
          </Badge>
        </Tooltip>
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
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Tooltip title="Approve Candidates" placement="top">
          <Button
            onClick={() => setShowApproveForm(true)}
            variant="contained"
            color="primary"
            className={classes.approveButton}
          >
            <GroupAddIcon style={{marginRight: '5px'}} /> Approve
          </Button>
        </Tooltip>

        <Tooltip title="Print" placement="top">
          <IconButton className={classes.iconButton} aria-label="print">
            {print}
          </IconButton>
        </Tooltip>
      </div>
      {showApproveForm && (
        <ApproveNewApplicantForm
          submittedApplicants={submittedApplicants || ['loading...']}
          getSubmittedContacts={getSubmittedContacts}
          approveNewContactsStatus={approveNewContactsStatus}
          closeForm={() => setShowApproveForm(false)}
          showApproveForm={showApproveForm}
          setShowApproveForm={setShowApproveForm}
        />
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {};

export default TableToolbar;
