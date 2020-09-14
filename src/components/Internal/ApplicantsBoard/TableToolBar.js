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
    backgroundColor: 'rgba(140, 140, 140,0.3)',
    margin: '20px 0',
    borderRadius: '1px',
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
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  filterIcon: {
    margin: '10px',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: '0px 10px',
    width: '100%',
    borderRadius: '10px',
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '350px',
      marginTop: '0px',
      marginRight: '10px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '500px',

      marginRight: '50px',
    },
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  approveButton: {
    height: '32px',
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
  approveNewContactsStatus,
  submittedApplicants,
}) => {
  const classes = useToolbarStyles();

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
    <Toolbar className={classes.root} data-testid="table-toolbar">
      <div className={classes.container}>
        <TextField
          data-testid="search-bar-input"
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
        <div className={classes.iconsContainer}>
          <Tooltip title="Approve Candidates" placement="top">
            <Button
              data-testid="open-approve-form-button"
              onClick={() => setShowApproveForm(true)}
              variant="contained"
              color="primary"
              className={classes.approveButton}
            >
              <GroupAddIcon style={{marginRight: '5px'}} /> Approve
            </Button>
          </Tooltip>
          <Tooltip
            title="Filter Candidates"
            className={classes.filterIcon}
            placement="top"
          >
            <Badge
              badgeContent={filterCount}
              color="secondary"
              classes={{badge: classes.customBadge}}
            >
              <IconButton
                data-testid="filter-icon-button"
                onClick={() => handleClickOpenFilterForm()}
                aria-label="filter candidates"
                className={classes.iconButton}
              >
                <FilterListIcon />
              </IconButton>
            </Badge>
          </Tooltip>

          <Tooltip title="Print" placement="top">
            <IconButton
              data-testid="print-icon-button"
              className={classes.iconButton}
              aria-label="print"
            >
              {print}
            </IconButton>
          </Tooltip>
        </div>
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
