import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';

const ApproveNewApplicantForm = ({
  classes,
  submittedApplicants,
  getFilteredContactsSubmitted,
  approveNewContactsStatus,
  allFilteredContacts,
  setPresentApplicants,
  resetFilterCount,
  showApproveForm,
  setShowApproveForm,
}) => {
  useEffect(() => {
    getFilteredContactsSubmitted();
  }, [getFilteredContactsSubmitted]);

  const [selectedValues, setSelectedValues] = useState([]);
  const [applicantIds, setApplicantIds] = useState([]);
  const [errors, setErrors] = useState({});
  let options = [];

  if (submittedApplicants && submittedApplicants.length > 0)
    options = submittedApplicants.map(contact => {
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
    if (applicantIds.length === 0) {
      setErrors({no_applicants_error: 'Please select applicant(s)'});
    } else {
      await approveNewContactsStatus(applicantIds);
      setShowApproveForm(false);
      resetFilterCount();
      setPresentApplicants(allFilteredContacts);
    }
  };

  const inputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  };

  return (
    <Dialog
      maxWidth="md"
      open={showApproveForm}
      onClose={() => setShowApproveForm(false)}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogTitle id="form-dialog-title" style={{padding: '10px 20px'}}>
        <Typography component="p" variant="h6" className={classes.dialogTitle}>
          <span data-testid="form-header">Approve New Applicants</span>
          <IconButton
            edge="end"
            aria-label="close approve form"
            onMouseDown={() => setShowApproveForm(false)}
            style={{padding: '5px'}}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        <Autocomplete
          data-testid="autocomplete"
          multiple
          id="approve-contact-text-field"
          getOptionLabel={option => option.name}
          options={[...selectedValues, ...options]}
          filterSelectedOptions
          className={classes.searchBar}
          onChange={onChange}
          renderInput={params => (
            <TextField
              data-testid="autocomplete-text"
              {...params}
              variant="standard"
              label="Search by applicant's name or email"
              className={classes.searchBar}
              InputLabelProps={inputLabelProps}
            />
          )}
        />
        <FormHelperText className={classes.formHelperText}>
          {errors.no_applicants_error || null}
        </FormHelperText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          data-testid="approve-button"
          className={classes.approveButton}
          onClick={approve}
          variant="contained"
          color="primary"
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ApproveNewApplicantForm.propTypes = {
  classes: PropTypes.object.isRequired,
  approveNewContactsStatus: PropTypes.func.isRequired,
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
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px',
    margin: '20px auto 0px auto',
    [breakpoints.up('sm')]: {
      width: '700px',
    },
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '330px',
    [breakpoints.up('sm')]: {
      width: '500px',
    },
  },
  dialogTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
  },
  dialogActions: {
    padding: '20px',
  },

  formHeader: {
    marginBottom: spacing(2.5),
  },
  searchBar: {
    width: '100%',
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
  formHelperText: {
    color: palette.error.main,
    marginTop: '2px',
  },
});

export default withStyles(styles)(ApproveNewApplicantForm);
