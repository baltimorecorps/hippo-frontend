import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const ApproveNewApplicantForm = ({
  classes,
  submittedApplicants,
  getSubmittedContacts,
  approveNewContactsStatus,
  closeForm,
}) => {
  useEffect(() => {
    if (!submittedApplicants || submittedApplicants.length === 0)
      getSubmittedContacts();
  }, [submittedApplicants, getSubmittedContacts]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [applicantIds, setApplicantIds] = useState([]);

  const options = submittedApplicants.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      id: contact.id,
      contact: contact,
    };
  });

  const onChange = (event, values) => {
    setSelectedValues(values);
    setApplicantIds(
      values.map(value => {
        return {id: value.id};
      })
    );
  };

  const approve = async () => {
    await approveNewContactsStatus(applicantIds);
    closeForm();
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  return (
    <Paper className={classes.paper}>
      <Grid container justify="space-between" className={classes.formHeader}>
        <Typography variant="h5" component="h1">
          Approve New Applicants
        </Typography>
        <IconButton
          edge="end"
          aria-label="cancel form"
          onMouseDown={closeForm}
          className={classes.iconButton}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      <div className={classes.searchBarContainer}>
        <Autocomplete
          multiple
          id="approve-contact-text-field"
          getOptionLabel={option => option.name}
          options={[...selectedValues, ...options]}
          filterSelectedOptions
          className={classes.searchBar}
          onChange={onChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Search by applicant's name or email"
              className={classes.searchBar}
              InputLabelProps={inputLabelProps}
            />
          )}
        />
        <Button
          className={classes.approveButton}
          onClick={approve}
          variant="contained"
          color="primary"
        >
          Approve
        </Button>
      </div>
    </Paper>
  );
};

ApproveNewApplicantForm.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      contact: PropTypes.shape({
        email: PropTypes.string.isRequired,
        first_name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        last_name: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  approveNewContactsStatus: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
};

const styles = ({breakpoints, palette, spacing}) => ({
  resize: {
    fontSize: 16,
  },
  labelRoot: {
    fontSize: 17,
    [breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
  labelFocused: {
    fontSize: 19,
    color: '#000000',
    [breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
  paper: {
    width: '100%',
    padding: spacing(2, 3, 3),
    marginTop: '20px',
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: spacing(3),
    backgroundColor: '#f7f7f7',
    [breakpoints.down('sm')]: {
      width: '95%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing(3, 2),
    },
    [breakpoints.down('xs')]: {
      padding: spacing(2, 1),
    },
  },
  formHeader: {
    marginBottom: spacing(2.5),
  },
  searchBar: {
    width: '95%',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  approveButton: {
    marginTop: spacing(2),
  },
  iconButton: {
    flexBasis: '50px',
    padding: spacing(0.2),
    '&:hover': {
      color: 'black',
    },
  },
});

export default withStyles(styles)(ApproveNewApplicantForm);
